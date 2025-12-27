import ChessWebAPI from "chess-web-api";
import { cacheService } from "./cache.service";
import { processData, mapWithConcurrency } from "../utils/helpers";

const chessAPI = new ChessWebAPI();

export class ChessService {
    async getPlayer(id: string) {
        return cacheService.getOrSet(`player-${id}`, async () => {
            const player = await chessAPI.getPlayer(id);
            return processData(player.body);
        });
    }

    async getPlayerStats(id: string) {
        return cacheService.getOrSet(`stats-${id}`, async () => {
            const [stats, historyData] = await Promise.all([
                chessAPI.getPlayerStats(id),
                this.getRatingHistory(id)
            ]);

            return {
                ...processData(stats.body),
                history: historyData.history
            };
        });
    }

    async getPlayerFull(id: string) {
        return cacheService.getOrSet(`full-${id}`, async () => {
            const player = await chessAPI.getPlayer(id);
            const stats = await chessAPI.getPlayerStats(id);

            let clubs = { body: { clubs: [] } };
            try {
                clubs = await chessAPI.getPlayerClubs(id);
            } catch (e) {
                console.warn(`Failed to fetch clubs for ${id}`, e);
            }

            const { history, games } = await this.getRatingHistory(id);

            return processData({
                ...player.body,
                stats: stats.body,
                clubs: clubs.body.clubs,
                history,
                games
            });
        });
    }

    async getPlayerClubs(id: string) {
        return cacheService.getOrSet(`clubs-${id}`, async () => {
            const clubs = await chessAPI.getPlayerClubs(id);
            return processData(clubs.body);
        });
    }

    async getPlayerMatches(id: string) {
        return cacheService.getOrSet(`matches-${id}`, async () => {
            const matches = await chessAPI.getPlayerCurrentDailyChess(id);
            return processData(matches.body);
        });
    }

    async comparePlayers(p1: string, p2: string) {
        return cacheService.getOrSet(`compare-${p1}-${p2}`, async () => {
            const p1Profile = await chessAPI.getPlayer(p1);
            const p1Stats = await chessAPI.getPlayerStats(p1);
            const p1HistoryData = await this.getRatingHistory(p1);

            const p2Profile = await chessAPI.getPlayer(p2);
            const p2Stats = await chessAPI.getPlayerStats(p2);
            const p2HistoryData = await this.getRatingHistory(p2);

            const p1History = p1HistoryData.history;
            const p2History = p2HistoryData.history;

            const p1Data = [p1Profile, p1Stats];
            const p2Data = [p2Profile, p2Stats];

            const historyMap = new Map<string, { date: string, player1?: number, player2?: number }>();

            p1History.forEach((h: any) => {
                if (!historyMap.has(h.date)) historyMap.set(h.date, { date: h.date });
                historyMap.get(h.date)!.player1 = h.rating;
            });

            p2History.forEach((h: any) => {
                if (!historyMap.has(h.date)) historyMap.set(h.date, { date: h.date });
                historyMap.get(h.date)!.player2 = h.rating;
            });

            const mergedHistory = Array.from(historyMap.values()).sort((a, b) => a.date.localeCompare(b.date));

            let lastP1: number | undefined = undefined;
            let lastP2: number | undefined = undefined;

            const filledHistory = mergedHistory.map(entry => {
                if (entry.player1 !== undefined) lastP1 = entry.player1;
                if (entry.player2 !== undefined) lastP2 = entry.player2;

                return {
                    date: entry.date,
                    player1: entry.player1 !== undefined ? entry.player1 : lastP1,
                    player2: entry.player2 !== undefined ? entry.player2 : lastP2
                };
            });

            return {
                player1: { ...processData(p1Data[0].body), stats: processData(p1Data[1].body) },
                player2: { ...processData(p2Data[0].body), stats: processData(p2Data[1].body) },
                history: filledHistory
            };
        });
    }

    async getPlayerInsights(id: string) {
        return cacheService.getOrSet(`insights-${id}`, async () => {
            const archives = await chessAPI.getPlayerMonthlyArchives(id);
            const monthlyArchives = archives.body.archives;

            if (!monthlyArchives || monthlyArchives.length === 0) {
                return { activity: [], openings: [], dailyActivity: [] };
            }

            const lastMonths = monthlyArchives.slice(-3);

            const gamesResults = (await mapWithConcurrency(lastMonths, 5, async (url: string) => {
                try {
                    const res = await fetch(url);
                    if (!res.ok) {
                        console.error(`Failed to fetch archive ${url}: ${res.status} ${res.statusText}`);
                        return { games: [] };
                    }
                    return await res.json();
                } catch (err) {
                    console.error(`Error fetching archive ${url}:`, err);
                    return { games: [] };
                }
            })).filter(g => g !== null);

            const allGames = gamesResults.flatMap((data: any) => data.games || []);

            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const lastMonthGames = allGames.filter((game: any) => new Date(game.end_time * 1000) >= thirtyDaysAgo);

            const dailyActivity: Record<string, number> = {};
            allGames.forEach((game: any) => {
                const dateObj = new Date(game.end_time * 1000);
                const dateStr = dateObj.toISOString().split('T')[0];
                dailyActivity[dateStr] = (dailyActivity[dateStr] || 0) + 1;
            });


            const activityMap = new Array(7).fill(0).map(() => new Array(24).fill(0));

            interface OpeningStats { wins: number, loss: number, draw: number, total: number, color: 'white' | 'black' }
            const openingsCount: Record<string, OpeningStats> = {};

            const colorStats = {
                white: { wins: 0, loss: 0, draw: 0, total: 0 },
                black: { wins: 0, loss: 0, draw: 0, total: 0 }
            };
            const summary = { wins: 0, loss: 0, draw: 0, total: 0 };

            allGames.forEach((game: any) => {
                const dateObj = new Date(game.end_time * 1000);
                const day = dateObj.getDay();
                const hour = dateObj.getHours();

                activityMap[day][hour]++;

                const isWhite = game.white.username.toLowerCase() === id.toLowerCase();
                const result = isWhite ? game.white.result : game.black.result;

                summary.total++;
                if (result === 'win') summary.wins++;
                else if (['checkmated', 'resigned', 'timeout', 'abandoned'].includes(result)) summary.loss++;
                else summary.draw++;

                if (isWhite) {
                    colorStats.white.total++;
                    if (result === 'win') colorStats.white.wins++;
                    else if (['checkmated', 'resigned', 'timeout', 'abandoned'].includes(result)) colorStats.white.loss++;
                    else colorStats.white.draw++;
                } else {
                    colorStats.black.total++;
                    if (result === 'win') colorStats.black.wins++;
                    else if (['checkmated', 'resigned', 'timeout', 'abandoned'].includes(result)) colorStats.black.loss++;
                    else colorStats.black.draw++;
                }

                if (game.pgn) {
                    const openingMatch = game.pgn.match(/\[Opening "([^"]+)"\]/);
                    if (openingMatch) {
                        const opening = openingMatch[1];
                        const baseOpening = opening.split(':')[0].split(',')[0];
                        const key = `${baseOpening}|${isWhite ? 'white' : 'black'}`;

                        if (!openingsCount[key]) {
                            openingsCount[key] = { wins: 0, loss: 0, draw: 0, total: 0, color: isWhite ? 'white' : 'black' };
                        }

                        openingsCount[key].total++;
                        if (result === 'win') openingsCount[key].wins++;
                        else if (['checkmated', 'resigned', 'timeout', 'abandoned'].includes(result)) openingsCount[key].loss++;
                        else openingsCount[key].draw++;
                    }
                }
            });

            const activity = activityMap.map((hours, day) => ({
                day,
                hours: hours.map((count, hour) => ({ hour, count }))
            }));

            const sortedOpenings = Object.entries(openingsCount)
                .sort(([, a], [, b]) => b.total - a.total)
                .slice(0, 10)
                .map(([key, stats]) => ({ name: key.split('|')[0], ...stats }));

            const dailyActivityArray = Object.entries(dailyActivity).map(([date, count]) => ({ date, count }));

            const gamesForExplorer = lastMonthGames.map((g: any) => ({
                pgn: g.pgn,
                url: g.url,
                white: { username: g.white.username, result: g.white.result, rating: g.white.rating },
                black: { username: g.black.username, result: g.black.result, rating: g.black.rating },
                date: g.end_time,
                end_time: g.end_time
            }));

            return {
                username: id,
                activity,
                openings: sortedOpenings,
                dailyActivity: dailyActivityArray,
                colorStats,
                summary,
                totalGames: allGames.length,
                games: gamesForExplorer
            };
        });
    }

    async getRatingHistory(username: string) {
        try {
            const archives = await chessAPI.getPlayerMonthlyArchives(username);
            const monthlyArchives = archives.body.archives;
            if (!monthlyArchives || monthlyArchives.length === 0) return { history: [], games: [] };

            const last12 = monthlyArchives.slice(-12);

            const rawResults = await mapWithConcurrency(last12, 3, async (url: string) => {
                try {
                    const res = await fetch(url);
                    if (!res.ok) return null;
                    const data = await res.json();
                    const games = data.games || [];

                    const rapidGames = games.filter((g: any) => g.rules === 'chess' && g.time_class === 'rapid');

                    let historyPoint: { date: string, rating: number } | null = null;
                    if (rapidGames.length > 0) {
                        const lastGame = rapidGames[rapidGames.length - 1];
                        const isWhite = lastGame.white.username.toLowerCase() === username.toLowerCase();
                        const rating = isWhite ? lastGame.white.rating : lastGame.black.rating;

                        const dateObj = new Date(lastGame.end_time * 1000);
                        const date = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-01`;
                        historyPoint = { date, rating };
                    }

                    return { historyPoint, games };
                } catch (e) {
                    console.error(`Error processing archive ${url}:`, e);
                    return null;
                }
            });

            const validResults = rawResults.filter((r): r is { historyPoint: { date: string; rating: number } | null; games: any[] } => r !== null);

            const history = validResults
                .map(r => r.historyPoint)
                .filter((h): h is { date: string, rating: number } => h !== null);

            const games = validResults.flatMap(r => r.games);

            return { history, games };
        } catch (e) {
            console.error("Error fetching history for", username, e);
            return { history: [], games: [] };
        }
    }
}

export const chessService = new ChessService();
