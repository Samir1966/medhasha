"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍉", "🍒", "🥝"];

interface CardType {
    id: number;
    content: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export function MatchingGame() {
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffledIcons = [...ICONS, ...ICONS]
            .sort(() => Math.random() - 0.5)
            .map((icon, index) => ({
                id: index,
                content: icon,
                isFlipped: false,
                isMatched: false,
            }));
        setCards(shuffledIcons);
        setFlippedCards([]);
        setMoves(0);
        setIsWon(false);
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

        const newCards = [...cards];
        newCards[id].isFlipped = true;
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            checkForMatch(newFlipped, newCards);
        }
    };

    const checkForMatch = (flipped: number[], currentCards: CardType[]) => {
        const [first, second] = flipped;
        if (currentCards[first].content === currentCards[second].content) {
            currentCards[first].isMatched = true;
            currentCards[second].isMatched = true;
            setCards([...currentCards]);
            setFlippedCards([]);

            if (currentCards.every(c => c.isMatched)) {
                setIsWon(true);
            }
        } else {
            setTimeout(() => {
                currentCards[first].isFlipped = false;
                currentCards[second].isFlipped = false;
                setCards([...currentCards]);
                setFlippedCards([]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex w-full items-center justify-between">
                <div className="text-xl font-bold">Moves: {moves}</div>
                <Button onClick={initializeGame} variant="outline" size="icon">
                    <RefreshCw className="h-5 w-5" />
                </Button>
            </div>

            {isWon && (
                <div className="text-center animate-bounce">
                    <h2 className="text-2xl font-bold text-green-600">You Won! 🎉</h2>
                    <p>Great memory!</p>
                </div>
            )}

            <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        className={cn(
                            "flex h-20 w-20 cursor-pointer items-center justify-center text-3xl transition-all duration-300",
                            card.isFlipped || card.isMatched ? "bg-white rotate-0" : "bg-primary rotate-180"
                        )}
                        onClick={() => handleCardClick(card.id)}
                    >
                        {(card.isFlipped || card.isMatched) ? card.content : "?"}
                    </Card>
                ))}
            </div>
        </div>
    );
}
