import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconUser,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
    const links = [
        {
            title: "Profile",
            icon: (
                <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Magnus Carlsen",
            icon: (
                <img
                    src="https://ui-avatars.com/api/?name=Magnus+Carlsen&background=random"
                    className="h-full w-full rounded-full object-cover"
                    alt="Magnus Carlsen"
                />
            ),
            href: "https://www.chess.com/member/magnuscarlsen",
        },
        {
            title: "Hikaru Nakamura",
            icon: (
                <img
                    src="https://ui-avatars.com/api/?name=Hikaru+Nakamura&background=random"
                    className="h-full w-full rounded-full object-cover"
                    alt="Hikaru Nakamura"
                />
            ),
            href: "https://www.chess.com/member/hikaru",
        },
        {
            title: "Fabiano Caruana",
            icon: (
                <img
                    src="https://ui-avatars.com/api/?name=Fabiano+Caruana&background=random"
                    className="h-full w-full rounded-full object-cover"
                    alt="Fabiano Caruana"
                />
            ),
            href: "https://www.chess.com/member/fabianocaruana",
        },
        {
            title: "Praggnanandhaa",
            icon: (
                <img
                    src="https://ui-avatars.com/api/?name=Praggnanandhaa&background=random"
                    className="h-full w-full rounded-full object-cover"
                    alt="Praggnanandhaa"
                />
            ),
            href: "https://www.chess.com/member/rpragchess",
        },
        {
            title: "Gukesh D",
            icon: (
                <img
                    src="https://ui-avatars.com/api/?name=Gukesh+D&background=random"
                    className="h-full w-full rounded-full object-cover"
                    alt="Gukesh D"
                />
            ),
            href: "https://www.chess.com/member/gukeshdommaraju",
        },
        {
            title: "Samay Raina",
            icon: (
                <img
                    src="https://ui-avatars.com/api/?name=Samay+Raina&background=random"
                    className="h-full w-full rounded-full object-cover"
                    alt="Samay Raina"
                />
            ),
            href: "https://www.chess.com/member/samayraina",
        },
        {
            title: "rahulYUV",
            icon: (
                <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "https://github.com/rahulYUV",
        },
    ];
    return (
        <div className="flex items-center justify-center h-[35rem] w-full">
            <FloatingDock
                mobileClassName="translate-y-20" // only for demo, remove for production
                items={links}
            />
        </div>
    );
}
