"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Menu, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const { t, i18n } = useTranslation();
    const { setTheme } = useTheme();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative h-10 w-10 transition-transform group-hover:scale-110 duration-300">
                        <Image
                            src="/medhasha-logo.png"
                            alt="MedhAsha"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MedhAsha</span>
                </Link>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="font-bold">
                                {i18n.language.toUpperCase()}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => changeLanguage("en")}>
                                English
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeLanguage("hi")}>
                                हिंदी (Hindi)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeLanguage("or")}>
                                ଓଡ଼ିଆ (Odia)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
