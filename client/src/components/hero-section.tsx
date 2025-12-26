"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
    // Corrected words to avoid redundancy with "Analyze & Compare"
    const words = ["Player", "Opening", "Rival", "Grandmaster"]
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative z-20 flex flex-col items-center justify-center pt-10 pb-6 text-center w-full max-w-5xl mx-auto">



            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // smooth easeOuter
                className="space-y-3 relative"
            >

                {/* Main Heading */}
                <div className="relative">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 leading-[1.1]">
                        Unlock Your <br className="hidden md:block" />
                        <span className="relative inline-block pb-1">
                            {/* Simple Black/White Text */}
                            <span className="relative z-10">
                                Chess Statistics
                            </span>
                        </span>
                    </h1>
                </div>

                {/* Refining the Subheading - Clean Grey & Gold */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium">
                    <span>Analyze & Compare</span>
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={words[index]}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="font-bold text-amber-500 dark:text-amber-400 px-1"
                        >
                            {words[index]}
                        </motion.span>
                    </AnimatePresence>
                    <span>statistics instantly.</span>
                </div>
            </motion.div>
        </div>
    )
}
