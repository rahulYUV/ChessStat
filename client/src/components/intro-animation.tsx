import { motion } from "framer-motion";
import { useEffect } from "react";
import { Crown } from "lucide-react";

interface IntroAnimationProps {
    onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
    useEffect(() => {
        // ULTRA FLASH: Show for only 0.4 seconds
        const timer = setTimeout(onComplete, 400);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white text-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Logo Icon */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full" />
                    <Crown className="w-20 h-20 text-green-600 relative z-10" strokeWidth={1.5} />
                </motion.div>

                {/* Text Logo */}
                <motion.div
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05, duration: 0.15 }}
                    className="flex items-center gap-1"
                >
                    <span className="text-4xl md:text-5xl font-bold tracking-tight text-black">
                        Chess
                    </span>
                    <span className="text-4xl md:text-5xl font-bold tracking-tight text-green-600">
                        Stat
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}
