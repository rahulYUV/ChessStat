import { Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
}

interface Team1Props {
    heading?: string;
    subheading?: string;
    description?: string;
    members?: TeamMember[];
    className?: string;
}

export const TeamSection = ({
    heading = "Meet the Team",
    description = "The brilliant minds behind ChessStat.",
    members = [
        {
            id: "member-1",
            name: "Rahul Kumar",
            role: "CEO & Founder",
            avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
            github: "https://github.com/rahulYUV",
            twitter: "#",
            linkedin: "#",
        },
        {
            id: "member-2",
            name: "Rahul Kumar",
            role: "CTO",
            avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
            github: "https://github.com/rahulYUV",
            twitter: "#",
            linkedin: "#",
        },
        {
            id: "member-3",
            name: "Rahul Kumar",
            role: "Head of Design",
            avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
            github: "https://github.com/rahulYUV",
            twitter: "#",
            linkedin: "#",
        },
    ],
    className,
}: Team1Props) => {
    return (
        <section className={cn("py-24 lg:py-32", className)}>
            <div className="container mx-auto px-4 z-20 relative">
                <div className="mb-16 text-center">
                    <h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-5xl text-white">
                        {heading}
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-300">
                        {description}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {members.map((member) => (
                        <div key={member.id} className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">
                                    <Avatar className="size-20 lg:size-24">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback className="text-lg font-semibold">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className="mb-6">
                                    <h3 className="mb-1 text-lg font-semibold text-white">{member.name}</h3>
                                    <p className="text-sm font-medium text-green-400">
                                        {member.role}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    {member.github && (
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-lg bg-white/20 p-2 hover:bg-white/30 transition-colors"
                                        >
                                            <Github className="size-4 text-white" />
                                        </a>
                                    )}
                                    {member.twitter && (
                                        <a
                                            href={member.twitter}
                                            className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors opacity-75 cursor-not-allowed"
                                        >
                                            <Twitter className="size-4 text-white" />
                                        </a>
                                    )}
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            className="rounded-lg bg-white/10 p-2 hover:bg-white/20 transition-colors opacity-75 cursor-not-allowed"
                                        >
                                            <Linkedin className="size-4 text-white" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
