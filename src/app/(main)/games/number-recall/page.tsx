"use client";

import NumberRecallGame from "@/components/games/NumberRecall";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NumberRecallPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/games">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">Number Recall</h1>
            </div>

            <NumberRecallGame />
        </div>
    );
}
