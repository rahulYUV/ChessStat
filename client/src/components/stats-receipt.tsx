import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import type { PlayerData } from "@/types";

interface StatsReceiptProps {
    data: PlayerData;
}

export const StatsReceipt = ({ data }: StatsReceiptProps) => {
    const receiptRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (receiptRef.current === null) {
            return;
        }

        try {
            const dataUrl = await toPng(receiptRef.current, { cacheBust: true, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `${data.username}-chess-receipt.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to generate receipt image', err);
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
        <div className="flex flex-col items-center gap-4">
            <Button
                onClick={handleDownload}
                variant="outline"
                className="gap-2 bg-white/10 hover:bg-white/20 border-white/20 text-white"
            >
                <Download className="w-4 h-4" />
                Download Receipt
            </Button>

            {/* The Receipt Container - Hidden from view but rendered for capture */}
            <div className="fixed left-[-9999px] top-0">
                <div
                    ref={receiptRef}
                    className="w-[320px] bg-[#fdfdfd] text-neutral-900 p-6 font-mono text-sm relative"
                    style={{
                        fontFamily: '"Courier New", Courier, monospace',
                        backgroundImage: 'radial-gradient(#00000005 1px, transparent 1px)',
                        backgroundSize: '10px 10px'
                    }}
                >
                    {/* Jagged top edge effect using CSS */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(45deg,transparent_33.333%,#fdfdfd_33.333%,#fdfdfd_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fdfdfd_33.333%,#fdfdfd_66.667%,transparent_66.667%)] bg-[length:12px_20px] bg-[position:0_-10px] rotate-180"></div>

                    <div className="text-center mb-6 space-y-1">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-2xl">♟</span>
                        </div>
                        <h2 className="text-xl font-black tracking-widest uppercase">CHESS STATS</h2>
                        <p className="text-xs text-neutral-500">OFFICIAL ANALYTICS RECEIPT</p>
                        <p className="text-xs text-neutral-400">--------------------------------</p>
                    </div>

                    <div className="space-y-1 mb-4 text-xs uppercase">
                        <div className="flex justify-between">
                            <span className="text-neutral-500">DATE:</span>
                            <span>{currentDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">PLAYER:</span>
                            <span className="font-bold">{data.username}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">COUNTRY:</span>
                            <span>{data.country?.split('/').pop() || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">ID:</span>
                            <span>{data.player_id || 'N/A'}</span>
                        </div>
                    </div>

                    <div className="text-center text-xs text-neutral-400 my-2">--------------------------------</div>

                    <div className="space-y-2 text-sm uppercase">
                        <div className="flex justify-between items-end">
                            <span>RAPID RATING</span>
                            <span className="flex-1 border-b border-dotted border-neutral-300 mx-2 mb-1"></span>
                            <span className="font-bold">{getRating('chess_rapid')}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span>BLITZ RATING</span>
                            <span className="flex-1 border-b border-dotted border-neutral-300 mx-2 mb-1"></span>
                            <span className="font-bold">{getRating('chess_blitz')}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span>BULLET RATING</span>
                            <span className="flex-1 border-b border-dotted border-neutral-300 mx-2 mb-1"></span>
                            <span className="font-bold">{getRating('chess_bullet')}</span>
                        </div>
                    </div>

                    <div className="text-center text-xs text-neutral-400 my-4">--------------------------------</div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-lg font-bold">
                            <span>TOTAL GAMES</span>
                            <span>
                                {/* @ts-ignore */}
                                {(data.stats?.chess_rapid?.record?.win || 0) + (data.stats?.chess_rapid?.record?.loss || 0) + (data.stats?.chess_rapid?.record?.draw || 0) +
                                    (data.stats?.chess_blitz?.record?.win || 0) + (data.stats?.chess_blitz?.record?.loss || 0) + (data.stats?.chess_blitz?.record?.draw || 0) +
                                    (data.stats?.chess_bullet?.record?.win || 0) + (data.stats?.chess_bullet?.record?.loss || 0) + (data.stats?.chess_bullet?.record?.draw || 0)
                                }
                            </span>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-500 uppercase">
                            <span>ACCOUNT STATUS</span>
                            <span>{data.status || 'ACTIVE'}</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center space-y-2">
                        {/* Realistic Barcode SVG */}
                        <div className="h-12 w-full flex items-center justify-center opacity-80">
                            <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                                <path d="M0,0 h2 v40 h-2 M4,0 h2 v40 h-2 M8,0 h4 v40 h-4 M14,0 h2 v40 h-2 M18,0 h6 v40 h-6 M26,0 h2 v40 h-2 M30,0 h2 v40 h-2 M34,0 h4 v40 h-4 M40,0 h2 v40 h-2 M44,0 h2 v40 h-2 M48,0 h6 v40 h-6 M56,0 h2 v40 h-2 M60,0 h4 v40 h-4 M66,0 h2 v40 h-2 M70,0 h2 v40 h-2 M74,0 h6 v40 h-6 M82,0 h2 v40 h-2 M86,0 h4 v40 h-4 M92,0 h2 v40 h-2 M96,0 h2 v40 h-2 M100,0 h6 v40 h-6 M108,0 h2 v40 h-2 M112,0 h2 v40 h-2 M116,0 h4 v40 h-4 M122,0 h2 v40 h-2 M126,0 h6 v40 h-6 M134,0 h2 v40 h-2 M138,0 h2 v40 h-2 M142,0 h4 v40 h-4 M148,0 h2 v40 h-2 M152,0 h2 v40 h-2 M156,0 h6 v40 h-6 M164,0 h2 v40 h-2 M168,0 h4 v40 h-4 M174,0 h2 v40 h-2 M178,0 h2 v40 h-2 M182,0 h6 v40 h-6 M190,0 h2 v40 h-2 M194,0 h2 v40 h-2" fill="#000" />
                            </svg>
                        </div>
                        <p className="text-[10px] text-neutral-400 uppercase">Thank you for playing chess</p>
                        <p className="text-[10px] text-neutral-400">chess-aplha.vercel.app</p>
                    </div>

                    {/* Jagged bottom edge effect */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-[linear-gradient(45deg,transparent_33.333%,#fdfdfd_33.333%,#fdfdfd_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#fdfdfd_33.333%,#fdfdfd_66.667%,transparent_66.667%)] bg-[length:12px_20px] bg-[position:0_-10px]"></div>
                </div>
            </div>
        </div>
    );
};
