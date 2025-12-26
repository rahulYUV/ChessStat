import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
// @ts-ignore
import welcomeImage from "@/assets/welcome.png";

interface IntroAnimationProps {
    onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
    useEffect(() => {
        // Just show the image for a fixed short duration then exit
        const timer = setTimeout(onComplete, 300);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {/* Background Doodle Image - Main Content now */}
            <div className="absolute inset-0 z-0">
                <img
                    src={welcomeImage}
                    alt="background"
                    className="w-full h-full object-cover grayscale blur-sm opacity-50"
                />
            </div>

            {/* Foreground removed as requested */}
        </motion.div>
    );
}
