import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
    title: string;
    description: string;
    pillColor: string;
    linkText?: string;
    className?: string; // Add className prop for custom styling if needed
}

function FeatureCard({ title, description, pillColor, linkText = "Learn more", className }: FeatureCardProps) {
    return (
        <div className={cn("flex flex-col justify-between p-8 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200 h-full group", className)}>
            <div className="space-y-4">
                <div className={cn("px-3 py-1 w-fit rounded-lg text-xs font-semibold", pillColor)}>
                    {title}
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="mt-8 flex items-center text-xs text-neutral-500 font-medium group-hover:text-primary transition-colors cursor-pointer">
                {linkText} <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
        </div>
    );
}

export function WhatWeDo() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16 space-y-12">
            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-neutral-200 dark:to-neutral-500">
                    Why Chess Stats?
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                    Our platform transforms raw game data into actionable insights. With our
                    <span className="font-semibold text-primary"> Advanced Performance Tracking System</span>,
                    every move you make helps uncover your path to mastery.
                </p>
            </div>

            <div className="flex flex-col border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm">
                {/* Row 1: 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
                    <FeatureCard
                        title="Deep Analysis"
                        pillColor="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                        description="Dive into detailed statistics beyond just rating changes. Understand why you win or lose with comprehensive breakdown of your games."
                    />
                    <FeatureCard
                        title="Opening Explorer"
                        pillColor="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                        description="Visualize your opening performance. Identify your strongest variations and plug the leaks in your repertoire."
                    />
                    <FeatureCard
                        title="Player Comparisons"
                        pillColor="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                        description="Head-to-head analysis with any player. See who really dominates the match history and compare key metrics side-by-side."
                    />
                </div>

                {/* Row 2: 4 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
                    <FeatureCard
                        title="Activity Heatmaps"
                        pillColor="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        description="Discover your peak performance times. See when you play your best chess with intuitive activity visualizations."
                    />
                    <FeatureCard
                        title="Win Rates"
                        pillColor="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        description="Detailed win/loss/draw breakdown by color, time control, and opponent rating. Know your strengths."
                    />
                    <FeatureCard
                        title="Community Benchmarks"
                        pillColor="bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
                        description="See how your stats stack up against the community and your favorite pro players."
                    />
                    <FeatureCard
                        title="Export Data"
                        pillColor="bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
                        description="Your data belongs to you. Export your stats and game history for offline analysis or backup."
                    />
                </div>

                {/* Row 3: 2 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
                    <FeatureCard
                        title="Improvement Tracking"
                        pillColor="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        description="Track your rating progression over time with interactive charts. identifying plateaus and breakthroughs in your chess journey."
                        linkText="Track progress"
                    />
                    <FeatureCard
                        title="Pro Insights"
                        pillColor="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        description="Compare your stats directly against Grandmasters. See where your accuracy, opening choices, and endgame technique differ from the best."
                        linkText="View insights"
                    />
                    {/* Empty cells to fill the grid if needed, or strictly 2 columns */}
                </div>
            </div>
        </div>
    );
}
