"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Home, Gamepad2, MessageCircle, BookOpen, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation();

    const navItems = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/games", icon: Gamepad2, label: "games" },
        { href: "/chat", icon: MessageCircle, label: "chat" },
        { href: "/library", icon: BookOpen, label: "library" },
        { href: "/profile", icon: User, label: "elder" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur md:hidden">
            <div className="flex h-16 items-center justify-around">
                {navItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 p-2 text-xs transition-colors",
                                isActive
                                    ? "text-primary font-bold"
                                    : "text-muted-foreground hover:text-primary"
                            )}
                        >
                            <Icon className={cn("h-6 w-6", isActive && "fill-current")} />
                            <span>{t(label)}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
