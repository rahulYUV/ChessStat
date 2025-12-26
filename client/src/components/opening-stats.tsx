"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface OpeningStat {
    name: string;
    wins: number;
    loss: number;
    draw: number;
    total: number;
    color: 'white' | 'black';
}

interface OpeningStatsProps {
    openings: OpeningStat[];
    username: string;
}

export function OpeningStats({ openings, username }: OpeningStatsProps) {
    // Separate openings by color
    const { whiteOpenings, blackOpenings } = useMemo(() => {
        const white = openings.filter(o => o.color === 'white').slice(0, 5);
        const black = openings.filter(o => o.color === 'black').slice(0, 5);
        return { whiteOpenings: white, blackOpenings: black };
    }, [openings]);

    if (openings.length === 0) {
        return null;
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <OpeningCard title="As White" data={whiteOpenings} />
            <OpeningCard title="As Black" data={blackOpenings} />
        </div>
    );
}

function OpeningCard({ title, data }: { title: string, data: OpeningStat[] }) {
    if (data.length === 0) return null;

    return (
        <div className="bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-3xl p-6 border border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${title === 'As White' ? 'bg-white border border-neutral-300' : 'bg-neutral-800'}`} />
                <h3 className="text-xl font-bold">{title}</h3>
            </div>

            <div className="space-y-6">
                {data.map((opening, idx) => (
                    <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold truncate max-w-[70%] text-neutral-800 dark:text-neutral-200" title={opening.name}>
                                {opening.name}
                            </span>
                            <span className="text-neutral-500 font-medium">
                                {opening.total} games
                            </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="h-2.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden flex">
                            {/* Win Segment */}
                            <div
                                style={{ width: `${(opening.wins / opening.total) * 100}%` }}
                                className="h-full bg-green-500"
                            />
                            {/* Draw Segment */}
                            <div
                                style={{ width: `${(opening.draw / opening.total) * 100}%` }}
                                className="h-full bg-neutral-400"
                            />
                            {/* Loss Segment */}
                            <div
                                style={{ width: `${(opening.loss / opening.total) * 100}%` }}
                                className="h-full bg-red-500"
                            />
                        </div>

                        {/* Stats Text */}
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <div className="flex gap-3">
                                <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                                    <TrendingUp className="h-3 w-3" /> {((opening.wins / opening.total) * 100).toFixed(0)}%
                                </span>
                                <span className="flex items-center gap-1 text-neutral-500">
                                    <Minus className="h-3 w-3" /> {((opening.draw / opening.total) * 100).toFixed(0)}%
                                </span>
                                <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                                    <TrendingDown className="h-3 w-3" /> {((opening.loss / opening.total) * 100).toFixed(0)}%
                                </span>
                            </div>
                            {/* Win Rate Highlight if good */}
                            {(opening.wins / opening.total) > 0.55 && (
                                <div className="flex items-center gap-1 text-amber-500 font-bold">
                                    <Trophy className="h-3 w-3" />
                                    Top Pick
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
