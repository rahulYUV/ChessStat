import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, X, Receipt } from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { PlayerData } from "@/types";
import { motion, AnimatePresence } from "motion/react";

interface StatsReceiptProps {
    data: PlayerData;
}

export const StatsReceipt = ({ data }: StatsReceiptProps) => {
    const receiptRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (receiptRef.current === null) {
            return;
        }

        setIsDownloading(true);
        try {
            const dataUrl = await toPng(receiptRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `${data.username}-chess-receipt.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate receipt image', err);
        } finally {
            setIsDownloading(false);
        }
    };

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Helper to format rating
    const getRating = (key: string) => {
        // @ts-ignore
        return data.stats?.[key]?.last?.rating || data.stats?.[key]?.rating || 'Unrated';
    };

    return (
        <>
            <div className="flex justify-center w-full mt-2">
                <Button
                    onClick={() => setIsOpen(true)}
                    variant="outline"
                    className="gap-2 w-full md:w-auto border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
                >
                    <Receipt className="w-4 h-4" />
                    View Stats Receipt
                </Button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-start pl-4 md:pl-10 p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-transparent"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute -right-4 -top-4 p-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Receipt Container */}
                            <div className="overflow-hidden rounded-sm shadow-2xl">
                                <div
                                    ref={receiptRef}
                                    className="w-[300px] bg-white text-black p-6 font-mono text-xs relative shadow-2xl"
                                    style={{
                                        fontFamily: '"Courier New", Courier, monospace',
                                    }}
                                >
                                    {/* Jagged top edge effect */}
                                    <div className="absolute top-0 left-0 w-full h-3 bg-[linear-gradient(45deg,transparent_33.333%,#ffffff_33.333%,#ffffff_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#ffffff_33.333%,#ffffff_66.667%,transparent_66.667%)] bg-[length:16px_32px] bg-[position:0_-16px] rotate-180"></div>

                                    {/* Watermark/Stamp */}
                                    <div className="absolute top-24 right-8 transform rotate-[-15deg] opacity-10 pointer-events-none">
                                        <div className="border-4 border-black text-black px-4 py-1 font-black text-4xl tracking-widest uppercase rounded-sm">
                                            VERIFIED
                                        </div>
                                    </div>

                                    <div className="text-center mb-4 space-y-1 mt-2 relative z-10">
                                        <div className="w-12 h-12 bg-black text-white rounded-none flex items-center justify-center mx-auto mb-2 shadow-2xl rotate-3">
                                            <span className="text-3xl">♞</span>
                                        </div>
                                        <h2 className="text-2xl font-black tracking-[0.25em] uppercase font-sans">CHESS<br />STATS</h2>
                                        <p className="text-[8px] text-neutral-500 tracking-[0.3em] uppercase mt-1">OFFICIAL DATA RECEIPT</p>
                                        <div className="w-full h-px bg-black my-2"></div>
                                    </div>

                                    <div className="space-y-2 mb-4 text-[10px] font-bold text-black font-mono">
                                        <div className="flex justify-between items-center">
                                            <span className="text-neutral-500 font-normal tracking-wider">DATE_TIME</span>
                                            <span>{currentDate}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-neutral-500 font-normal tracking-wider">PLAYER_ID</span>
                                            <span className="text-xs bg-black text-white px-1">{data.username}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-neutral-500 font-normal tracking-wider">REGION</span>
                                            <span className="uppercase">{data.country?.split('/').pop() || 'GLOBAL'}</span>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-dashed border-neutral-300 my-6"></div>

                                    <div className="space-y-2 text-xs font-bold font-mono">
                                        <div className="flex justify-between items-end group">
                                            <span className="bg-neutral-100 px-1">RAPID.RATING</span>
                                            <span className="flex-1 border-b border-neutral-300 mx-2 mb-1 opacity-50"></span>
                                            <span className="text-base">{getRating('chess_rapid')}</span>
                                        </div>
                                        <div className="flex justify-between items-end group">
                                            <span className="bg-neutral-100 px-1">BLITZ.RATING</span>
                                            <span className="flex-1 border-b border-neutral-300 mx-2 mb-1 opacity-50"></span>
                                            <span className="text-base">{getRating('chess_blitz')}</span>
                                        </div>
                                        <div className="flex justify-between items-end group">
                                            <span className="bg-neutral-100 px-1">BULLET.RATING</span>
                                            <span className="flex-1 border-b border-neutral-300 mx-2 mb-1 opacity-50"></span>
                                            <span className="text-base">{getRating('chess_bullet')}</span>
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-black my-6"></div>

                                    <div className="space-y-2 font-mono">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-[10px] tracking-wider">TOTAL GAMES PLAYED</span>
                                            <span className="text-xl font-black bg-black text-white px-2 py-0.5 transform -rotate-2">
                                                {/* @ts-ignore */}
                                                {(data.stats?.chess_rapid?.record?.win || 0) + (data.stats?.chess_rapid?.record?.loss || 0) + (data.stats?.chess_rapid?.record?.draw || 0) +
                                                    (data.stats?.chess_blitz?.record?.win || 0) + (data.stats?.chess_blitz?.record?.loss || 0) + (data.stats?.chess_blitz?.record?.draw || 0) +
                                                    (data.stats?.chess_bullet?.record?.win || 0) + (data.stats?.chess_bullet?.record?.loss || 0) + (data.stats?.chess_bullet?.record?.draw || 0)
                                                }
                                            </span>
                                        </div>

                                        <div className="pt-4 pb-2">
                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[8px] text-neutral-400 uppercase tracking-widest">AUTHORIZED SIGNATURE</span>
                                                    <div className="font-script text-xl text-black transform -rotate-6 font-bold opacity-80" style={{ fontFamily: 'cursive' }}>
                                                        Chess.com
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[8px] text-neutral-400 uppercase tracking-widest">STATUS</span>
                                                    <p className="font-bold text-black uppercase border border-black px-1 text-[10px] mt-1 inline-block">
                                                        {data.status || 'ACTIVE'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 text-center space-y-3">
                                        {/* CSS Barcode */}
                                        <div className="h-16 w-full mix-blend-multiply" style={{
                                            backgroundImage: `linear-gradient(to right, 
                                                black 0%, black 2%, white 2%, white 4%, 
                                                black 4%, black 5%, white 5%, white 6%, 
                                                black 6%, black 9%, white 9%, white 10%, 
                                                black 10%, black 12%, white 12%, white 14%, 
                                                black 14%, black 18%, white 18%, white 19%, 
                                                black 19%, black 20%, white 20%, white 22%, 
                                                black 22%, black 24%, white 24%, white 26%, 
                                                black 26%, black 28%, white 28%, white 29%, 
                                                black 29%, black 32%, white 32%, white 34%, 
                                                black 34%, black 36%, white 36%, white 38%, 
                                                black 38%, black 42%, white 42%, white 44%, 
                                                black 44%, black 46%, white 46%, white 48%, 
                                                black 48%, black 52%, white 52%, white 54%, 
                                                black 54%, black 58%, white 58%, white 60%, 
                                                black 60%, black 64%, white 64%, white 66%, 
                                                black 66%, black 70%, white 70%, white 72%, 
                                                black 72%, black 76%, white 76%, white 78%, 
                                                black 78%, black 82%, white 82%, white 84%, 
                                                black 84%, black 86%, white 86%, white 88%, 
                                                black 88%, black 92%, white 92%, white 94%, 
                                                black 94%, black 96%, white 96%, white 98%, 
                                                black 98%, black 100%)`
                                        }}></div>
                                        <div className="flex justify-between text-[8px] font-mono text-neutral-400 px-1 tracking-[0.2em]">
                                            <span>{data.player_id}</span>
                                            <span>ITEM:STATS-V1</span>
                                        </div>
                                        <p className="text-[10px] text-neutral-400 pt-2 font-mono">THANK YOU FOR PLAYING</p>
                                    </div>

                                    {/* Jagged bottom edge effect */}
                                    <div className="absolute bottom-0 left-0 w-full h-3 bg-[linear-gradient(45deg,transparent_33.333%,#fdfdfd_33.333%,#fdfdfd_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fdfdfd_33.333%,#fdfdfd_66.667%,transparent_66.667%)] bg-[length:16px_32px] bg-[position:0_-16px]"></div>
                                </div>
                            </div>

                            {/* Download Action */}
                            <div className="mt-4 flex justify-center">
                                <Button onClick={handleDownload} disabled={isDownloading} className="bg-white text-black hover:bg-neutral-200 font-bold shadow-xl">
                                    {isDownloading ? "Generating..." : (
                                        <>
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Receipt
                                        </>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
