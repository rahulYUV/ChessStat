import { GridBackground } from "./ui/grid-background";
import { Navbar } from "./Navbar";

export const ProfilePage = () => {
    return (
        <GridBackground>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center pt-20 p-4">
                {/* Blank page - same background as hero section */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold text-neutral-900 dark:text-white">
                        Profile
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400">
                        Coming soon...
                    </p>
                </div>
            </div>
        </GridBackground>
    );
};
