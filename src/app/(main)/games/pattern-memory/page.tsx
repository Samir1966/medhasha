import { PatternMemory } from "@/components/games/PatternMemory";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PatternMemoryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 p-4">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/games">
                        <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Pattern Memory</h1>
                        <p className="text-white/80 text-sm">Test your visual memory skills!</p>
                    </div>
                </div>

                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
                    <PatternMemory />
                </div>
            </div>
        </div>
    );
}
