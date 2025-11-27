"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, Volume2, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
}

export function ChatInterface() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'bot', content: 'Namaste! I am NeuroBuddy. How can I help you today?' }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const history = messages.map(m => ({ role: m.role, content: m.content }));
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.content, history }),
            });
            const data = await res.json();

            const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', content: data.response };
            setMessages(prev => [...prev, botMsg]);
            speak(data.response);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            // Stop listening logic (mock)
            setIsListening(false);
        } else {
            setIsListening(true);
            // Start listening logic (mock)
            setTimeout(() => {
                setInput("I am feeling a bit dizzy today.");
                setIsListening(false);
            }, 2000);
        }
    };

    return (
        <Card className="flex h-[80vh] flex-col border-0 shadow-none md:border">
            <CardHeader className="border-b px-4 py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    NeuroBuddy
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-4 py-2 text-sm",
                                    msg.role === 'user'
                                        ? "ml-auto bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}
                            >
                                {msg.content}
                                {msg.role === 'bot' && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 self-end opacity-50 hover:opacity-100"
                                        onClick={() => speak(msg.content)}
                                    >
                                        <Volume2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex w-max max-w-[80%] items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm">
                                <span className="animate-pulse">Thinking...</span>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-4">
                <div className="flex w-full items-center gap-2">
                    <Button
                        variant={isListening ? "destructive" : "outline"}
                        size="icon"
                        className="shrink-0"
                        onClick={toggleListening}
                    >
                        {isListening ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                    <Input
                        placeholder="Type or speak..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="flex-1"
                    />
                    <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
