import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export const AuthCallback = () => {
    const { login } = useAuth();

    useEffect(() => {
        // Get tokens from URL parameters
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");

        if (accessToken && refreshToken) {
            // Save tokens and redirect to home
            login(accessToken, refreshToken);

            // Clean URL
            window.history.replaceState({}, document.title, "/");

            // Reload to show authenticated state
            window.location.href = "/";
        }
    }, [login]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-lg font-medium">Completing sign in...</p>
            </div>
        </div>
    );
};
