import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { motion } from "motion/react";
import { Link2, CheckCircle, AlertCircle, Loader2, X } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const SettingsPage = ({ onClose }: { onClose: () => void }) => {
    const { user, accessToken } = useAuth();
    const [chessUsername, setChessUsername] = useState(user?.chessUsername || "");
    const [isLinking, setIsLinking] = useState(false);
    const [linkStatus, setLinkStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    const handleLinkChessAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!chessUsername.trim()) {
            setLinkStatus({
                type: "error",
                message: "Please enter a Chess.com username",
            });
            return;
        }

        setIsLinking(true);
        setLinkStatus({ type: null, message: "" });

        try {
            const response = await axios.post(
                `${API_URL}/auth/link-chess-account`,
                { chessUsername: chessUsername.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.data.success) {
                setLinkStatus({
                    type: "success",
                    message: "Chess.com account linked successfully! Refresh to see changes.",
                });

                // Reload page after 2 seconds to refresh user data
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error: any) {
            setLinkStatus({
                type: "error",
                message:
                    error.response?.data?.error ||
                    "Failed to link Chess.com account. Please try again.",
            });
        } finally {
            setIsLinking(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        Settings
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Account Info */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
                            Account Information
                        </h3>
                        <div className="space-y-3 bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl">
                            <div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Name
                                </p>
                                <p className="font-medium text-neutral-900 dark:text-white">
                                    {user?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Email
                                </p>
                                <p className="font-medium text-neutral-900 dark:text-white">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Link Chess.com Account */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Link2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                Link Chess.com Account
                            </h3>
                        </div>

                        {user?.chessUsername ? (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="font-medium text-green-900 dark:text-green-100">
                                            Chess.com account linked
                                        </p>
                                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                            Connected to:{" "}
                                            <a
                                                href={`https://chess.com/member/${user.chessUsername}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold underline"
                                            >
                                                @{user.chessUsername}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleLinkChessAccount} className="space-y-4">
                                <div>
                                    <Label htmlFor="chessUsername">
                                        Chess.com Username
                                    </Label>
                                    <Input
                                        id="chessUsername"
                                        type="text"
                                        placeholder="e.g., MagnusCarlsen"
                                        value={chessUsername}
                                        onChange={(e) => setChessUsername(e.target.value)}
                                        className="mt-2"
                                        disabled={isLinking}
                                    />
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                                        Enter your Chess.com username to link your account
                                    </p>
                                </div>

                                {linkStatus.type && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex items-start gap-3 p-4 rounded-xl ${linkStatus.type === "success"
                                                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                                            }`}
                                    >
                                        {linkStatus.type === "success" ? (
                                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                                        )}
                                        <p
                                            className={`text-sm ${linkStatus.type === "success"
                                                    ? "text-green-900 dark:text-green-100"
                                                    : "text-red-900 dark:text-red-100"
                                                }`}
                                        >
                                            {linkStatus.message}
                                        </p>
                                    </motion.div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isLinking || !chessUsername.trim()}
                                    className="w-full"
                                >
                                    {isLinking ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Validating...
                                        </>
                                    ) : (
                                        <>
                                            <Link2 className="w-4 h-4 mr-2" />
                                            Link Chess.com Account
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </section>
                </div>
            </motion.div>
        </motion.div>
    );
};
