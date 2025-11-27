import { MatchingGame } from "@/components/games/MatchingGame";

export default function MatchingGamePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-primary">Matching Pairs</h1>
            <MatchingGame />
        </div>
    );
}
