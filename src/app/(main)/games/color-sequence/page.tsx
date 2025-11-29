import { ColorSequence } from "@/components/games/ColorSequence";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ColorSequencePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 to-blue-500 p-4">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/games">
                        <Button variant="outline" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Color Sequence</h1>
                        <p className="text-white/80 text-sm">Remember the color patterns!</p>
                    </div>
                </div>

                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
                    <ColorSequence />
                </div>
            </div>
        </div>
    );
}
