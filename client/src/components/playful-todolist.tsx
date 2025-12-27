'use client';

import * as React from 'react';
import { motion, type Transition } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BarChart3, Trophy, ScrollText, Swords, Github, Crown, Puzzle, Hourglass, TrendingUp } from 'lucide-react';

const checkboxItems = [
    {
        id: 1,
        label: 'Analyze Game Statistics',
        icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
        strokeColor: 'stroke-blue-500',
        defaultChecked: false,
    },
    {
        id: 2,
        label: 'Compare with Grandmasters',
        icon: <Trophy className="h-5 w-5 text-amber-500" />,
        strokeColor: 'stroke-amber-500',
        defaultChecked: false,
    },
    {
        id: 3,
        label: 'Study Opening Trends',
        icon: <ScrollText className="h-5 w-5 text-purple-500" />,
        strokeColor: 'stroke-purple-500',
        defaultChecked: true,
    },
    {
        id: 4,
        label: 'Master e4 Repertoire',
        icon: <Swords className="h-5 w-5 text-rose-500" />,
        strokeColor: 'stroke-rose-500',
        defaultChecked: false,
    },
    {
        id: 5,
        label: 'Star on GitHub',
        icon: <Github className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />,
        strokeColor: 'stroke-neutral-900 dark:stroke-neutral-100',
        defaultChecked: true,
    },
    {
        id: 6,
        label: 'Become a Grandmaster',
        icon: <Crown className="h-5 w-5 text-yellow-500" />,
        strokeColor: 'stroke-yellow-500',
        defaultChecked: false,
    },
    {
        id: 7,
        label: 'Solve Daily Puzzles',
        icon: <Puzzle className="h-5 w-5 text-pink-500" />,
        strokeColor: 'stroke-pink-500',
        defaultChecked: true,
    },
    {
        id: 8,
        label: 'Master Endgames',
        icon: <Hourglass className="h-5 w-5 text-cyan-500" />,
        strokeColor: 'stroke-cyan-500',
        defaultChecked: false,
    },
    {
        id: 9,
        label: 'Reach 2000 ELO',
        icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
        strokeColor: 'stroke-emerald-500',
        defaultChecked: false,
    },
];

const getPathAnimate = (isChecked: boolean) => ({
    pathLength: isChecked ? 1 : 0,
    opacity: isChecked ? 1 : 0,
});

const getPathTransition = (isChecked: boolean): Transition => ({
    pathLength: { duration: 1, ease: 'easeInOut' },
    opacity: {
        duration: 0.01,
        delay: isChecked ? 0 : 1,
    },
});

export function PlayfulTodolist() {
    const [checked, setChecked] = React.useState(
        checkboxItems.map((i) => !!i.defaultChecked),
    );

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 px-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500 relative inline-block">
                Grandmaster Manifestation
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-amber-500 dark:text-amber-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </h2>

            <div className="bg-white/5 dark:bg-black/5 backdrop-blur-[2px] rounded-2xl py-16 px-8 border border-white/10 dark:border-white/5 shadow-xl ring-1 ring-black/5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {checkboxItems.map((item, idx) => (
                        <div key={item.id} className="flex items-center space-x-3 relative group">
                            <Checkbox
                                checked={checked[idx]}
                                onCheckedChange={(val) => {
                                    const updated = [...checked];
                                    updated[idx] = val === true;
                                    setChecked(updated);
                                }}
                                id={`checkbox-${item.id}`}
                                className="data-[state=checked]:bg-black data-[state=checked]:border-black dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white data-[state=checked]:text-white dark:data-[state=checked]:text-black h-6 w-6"
                            />
                            <div className="relative flex items-center gap-2">
                                {item.icon}
                                <Label
                                    htmlFor={`checkbox-${item.id}`}
                                    className="cursor-pointer text-lg font-medium text-neutral-700 dark:text-neutral-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {item.label}
                                </Label>
                                <motion.svg
                                    width="340"
                                    height="32"
                                    viewBox="0 0 340 32"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-20 h-10 -ml-1"
                                    style={{ overflow: 'visible', width: '120%' }}
                                >
                                    <motion.path
                                        d="M 10 16.91 s 79.8 -11.36 98.1 -11.34 c 22.2 0.02 -47.82 14.25 -33.39 22.02 c 12.61 6.77 124.18 -27.98 133.31 -17.28 c 7.52 8.38 -26.8 20.02 4.61 22.05 c 24.55 1.93 113.37 -20.36 113.37 -20.36"
                                        vectorEffect="non-scaling-stroke"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeMiterlimit={10}
                                        fill="none"
                                        initial={false}
                                        animate={getPathAnimate(!!checked[idx])}
                                        transition={getPathTransition(!!checked[idx])}
                                        className={item.strokeColor}
                                    />
                                </motion.svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
