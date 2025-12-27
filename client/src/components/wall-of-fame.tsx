'use client';

import { useEffect, useState } from 'react';
import { Crown, Trophy, TrendingUp, Flame, Zap, Swords, Globe2 } from 'lucide-react';

interface LeaderboardPlayer {
    username: string;
    score: number;
    rank: number;
    title?: string;
    avatar?: string;
    country?: string;
}

interface FameItem {
    username: string;
    action: string;
    // icon: React.ReactNode; // 
    time: string;
    avatar?: string;
}

const DEFAULT_DATA: FameItem[] = [
    { username: 'MagnusCarlsen', action: 'Rated 2882 (Blitz)', time: 'Live' },
    { username: 'Hikaru', action: 'Rated 3200+ (Bullet)', time: 'Live' },
    { username: 'FabianoCaruana', action: 'Top 3 Global', time: 'Live' },
    { username: 'Gukesh D', action: 'Rising Star', time: 'Live' },
];

export function WallOfFame() {
    const [items, setItems] = useState<FameItem[]>(DEFAULT_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboards = async () => {
            try {
                const res = await fetch('https://api.chess.com/pub/leaderboards');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();

                const newItems: FameItem[] = [];

                // Helper to process a category
                const processCategory = (players: LeaderboardPlayer[], categoryName: string) => {
                    // Take random 10 from top 40 to keep it fresh and plentiful for 2 rows
                    const topPlayers = players.slice(0, 40).sort(() => 0.5 - Math.random()).slice(0, 10);
                    topPlayers.forEach(p => {
                        newItems.push({
                            username: p.username,
                            avatar: p.avatar,
                            action: `#${p.rank} in ${categoryName} (${p.score})`,
                            time: 'Live'
                        });
                    });
                };

                if (data.live_blitz) processCategory(data.live_blitz, 'Blitz');
                if (data.live_bullet) processCategory(data.live_bullet, 'Bullet');
                if (data.live_rapid) processCategory(data.live_rapid, 'Rapid');

                // Shuffle the mixed results
                setItems(newItems.sort(() => 0.5 - Math.random()));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching leaderboards:", err);
                // Fallback to default data on error
                setLoading(false);
            }
        };

        fetchLeaderboards();
    }, []);

    // If loading, show simulated or default, otherwise show real
    const displayItems = items.length > 0 ? items : DEFAULT_DATA;
    // Split data into two unique rows
    const mid = Math.ceil(displayItems.length / 2);
    const row1 = displayItems.slice(0, mid);
    const row2 = displayItems.slice(mid);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-3 px-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-green-500 blur-sm rounded-full animate-pulse" />
                    <div className="relative w-2.5 h-2.5 rounded-full bg-green-500 border border-white" />
                </div>
                <h2 className="text-3xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500 relative inline-block flex items-center gap-2">
                    Global Chess Pulse <Globe2 className="w-5 h-5 text-neutral-400 inline-block text-neutral-800 dark:text-neutral-200" />
                    <svg className="absolute w-full h-3 -bottom-2 left-0 text-amber-500 dark:text-amber-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </h2>
            </div>

            {/* Glassmorphism Container with Two Rows */}
            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-[2px] rounded-2xl py-12 px-0 border border-white/10 dark:border-white/5 shadow-xl ring-1 ring-black/5 overflow-hidden mask-linear-gradient flex flex-col gap-8">

                {/* Row 1 - Left Scroll (Standard) */}
                <div className="relative flex overflow-x-hidden pause-on-hover group">
                    <div className="animate-marquee flex gap-6 w-max pl-4">
                        {[...row1, ...row1].map((item, idx) => (
                            <CardItem key={`r1-${idx}`} item={item} />
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 flex gap-6 w-max pl-4" aria-hidden="true">
                        {[...row1, ...row1].map((item, idx) => (
                            <CardItem key={`r1-dup-${idx}`} item={item} />
                        ))}
                    </div>
                </div>

                {/* Row 2 - Right Scroll (Reverse & Odd Speed) */}
                <div className="relative flex overflow-x-hidden pause-on-hover group">
                    {/* We use inline styles to override duration and direction for the 'odd' effect */}
                    <div
                        className="animate-marquee flex gap-6 w-max pl-4"
                        style={{ animationDirection: 'reverse', animationDuration: '70s' }}
                    >
                        {[...row2, ...row2].map((item, idx) => (
                            <CardItem key={`r2-${idx}`} item={item} />
                        ))}
                    </div>
                    <div
                        className="absolute top-0 animate-marquee2 flex gap-6 w-max pl-4"
                        aria-hidden="true"
                        style={{ animationDirection: 'reverse', animationDuration: '70s' }}
                    >
                        {[...row2, ...row2].map((item, idx) => (
                            <CardItem key={`r2-dup-${idx}`} item={item} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

// Extracted Card Component for cleaner code
function CardItem({ item }: { item: FameItem }) {
    return (
        <div className="flex items-center gap-4 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full py-3 pl-3 pr-8 min-w-[260px] shadow-sm hover:shadow-lg transition-all hover:scale-105 hover:bg-white/60 dark:hover:bg-neutral-800/60 cursor-default group/card">
            <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-300 to-blue-500 rounded-full opacity-30 blur group-hover/card:opacity-75 transition duration-500"></div>
                <img
                    src={item.avatar || `https://ui-avatars.com/api/?name=${item.username}&background=random`}
                    alt={item.username}
                    className="relative w-12 h-12 rounded-full border-2 border-white/20 object-cover"
                />
            </div>
            <div className="flex flex-col gap-0.5">
                <span className="text-base font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-1">
                    {item.username}
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-300 font-medium flex items-center gap-1.5 opacity-90">
                    {item.action}
                </span>
            </div>
        </div>
    );
}
