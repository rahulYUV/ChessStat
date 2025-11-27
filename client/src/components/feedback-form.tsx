import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function FeedbackForm() {
    const [comment, setComment] = useState("")

    const handleSubmit = async () => {
        if (!comment.trim()) return;

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });

            if (response.ok) {
                console.log("Comment saved successfully");
                setComment("");
                // You could add a toast notification here later
            } else {
                console.error("Failed to save comment");
            }
        } catch (error) {
            console.error("Error sending comment:", error);
        }
    }

    return (
        <div className="grid w-full max-w-sm gap-2 text-center">
            <p className="text-sm text-muted-foreground">
                We love to hear your comments and feedback
            </p>
            <Textarea
                placeholder="Type your message here."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[60px] h-[60px] bg-white/50 dark:bg-black/50 backdrop-blur-sm resize-none"
            />
            <Button onClick={handleSubmit} size="sm" className="w-full">
                Send comment
            </Button>
        </div>
    )
}
