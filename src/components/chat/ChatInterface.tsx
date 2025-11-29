"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, Volume2, StopCircle, Paperclip, X, FileText, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
    files?: FileAttachment[];
}

interface FileAttachment {
    name: string;
    type: string;
    url: string;
    size: number;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Namaste! I am NeuroBuddy, your AI health companion. How can I help you today? 🧠",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<FileAttachment[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsListening(false);
            };
        }
    }, []);

    const handleSend = async () => {
        if (!input.trim() && uploadedFiles.length === 0) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input || "Uploaded files",
            files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setUploadedFiles([]);
        setIsLoading(true);

        try {
            const history = messages.map((m) => ({ role: m.role, content: m.content }));
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg.content, history }),
            });
            const data = await res.json();

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: data.response,
            };
            setMessages((prev) => [...prev, botMsg]);
            speak(data.response);
        } catch (error) {
            console.error(error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: "I apologize, but I'm having trouble connecting right now. Please try again.",
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const speak = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.");
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleFileUpload = (files: FileList | null) => {
        if (!files) return;

        Array.from(files).forEach((file) => {
            // Validate file type
            if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
                alert("Only images and PDFs are supported");
                return;
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert("File size must be less than 10MB");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const fileAttachment: FileAttachment = {
                    name: file.name,
                    type: file.type,
                    url: e.target?.result as string,
                    size: file.size,
                };
                setUploadedFiles((prev) => [...prev, fileAttachment]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileUpload(e.dataTransfer.files);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    return (
        <Card className="flex h-[85vh] flex-col border-2 border-blue-200 dark:border-blue-500/30 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg overflow-hidden">
            {/* Header */}
            <CardHeader className="border-b border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm px-6 py-4">
                <div className="flex items-center gap-4">
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src="/neurobuddy-logo.png"
                            alt="NeuroBuddy"
                            width={60}
                            height={60}
                            className="drop-shadow-lg"
                        />
                    </motion.div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            NeuroBuddy
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.7, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="h-2 w-2 rounded-full bg-green-500"
                            />
                            <span className="text-xs text-muted-foreground">Online & Ready to Help</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent
                className="flex-1 overflow-hidden p-0 relative"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {isDragging && (
                    <div className="absolute inset-0 z-50 bg-blue-500/20 backdrop-blur-sm border-4 border-dashed border-blue-500 flex items-center justify-center">
                        <div className="text-center">
                            <Paperclip className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                            <p className="text-lg font-semibold text-blue-600">Drop files here</p>
                        </div>
                    </div>
                )}

                <ScrollArea className="h-full p-6">
                    <div className="flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={cn(
                                        "flex w-max max-w-[85%] flex-col gap-2",
                                        msg.role === "user" ? "ml-auto" : "mr-auto"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "rounded-2xl px-4 py-3 text-sm shadow-lg",
                                            msg.role === "user"
                                                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none"
                                                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-bl-none"
                                        )}
                                    >
                                        <p className="leading-relaxed">{msg.content}</p>

                                        {/* File Attachments */}
                                        {msg.files && msg.files.length > 0 && (
                                            <div className="mt-3 space-y-2">
                                                {msg.files.map((file, i) => (
                                                    <div
                                                        key={i}
                                                        className="rounded-lg overflow-hidden border border-white/20"
                                                    >
                                                        {file.type.startsWith("image/") ? (
                                                            <img
                                                                src={file.url}
                                                                alt={file.name}
                                                                className="w-full max-w-xs rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center gap-2 p-2 bg-white/10">
                                                                <FileText className="h-5 w-5" />
                                                                <span className="text-xs">{file.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {msg.role === "bot" && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 mt-2 opacity-50 hover:opacity-100"
                                                onClick={() => speak(msg.content)}
                                            >
                                                <Volume2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Typing Indicator */}
                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex w-max items-center gap-2 rounded-2xl rounded-bl-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 shadow-lg"
                            >
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                y: [0, -8, 0],
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                repeat: Infinity,
                                                delay: i * 0.15,
                                            }}
                                            className="h-2 w-2 rounded-full bg-blue-500"
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">NeuroBuddy is thinking...</span>
                            </motion.div>
                        )}

                        <div ref={scrollRef} />
                    </div>
                </ScrollArea>
            </CardContent>

            {/* Input Footer */}
            <CardFooter className="border-t border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-4">
                <div className="w-full space-y-3">
                    {/* Uploaded Files Preview */}
                    {uploadedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {uploadedFiles.map((file, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="relative group"
                                >
                                    {file.type.startsWith("image/") ? (
                                        <div className="relative">
                                            <img
                                                src={file.url}
                                                alt={file.name}
                                                className="h-20 w-20 object-cover rounded-lg border-2 border-blue-200"
                                            />
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => removeFile(index)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="relative flex items-center gap-2 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 border-blue-200">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                            <div className="text-xs">
                                                <p className="font-medium">{file.name}</p>
                                                <p className="text-muted-foreground">{formatFileSize(file.size)}</p>
                                            </div>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6 ml-2"
                                                onClick={() => removeFile(index)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Input Row */}
                    <div className="flex w-full items-center gap-2">
                        {/* Voice Button */}
                        <motion.div whileTap={{ scale: 0.95 }}>
                            <Button
                                variant={isListening ? "destructive" : "outline"}
                                size="icon"
                                className={cn(
                                    "shrink-0 rounded-full border-2",
                                    isListening
                                        ? "bg-gradient-to-r from-red-500 to-orange-500 border-red-400 animate-pulse"
                                        : "border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                )}
                                onClick={toggleListening}
                            >
                                {isListening ? (
                                    <StopCircle className="h-5 w-5" />
                                ) : (
                                    <Mic className="h-5 w-5" />
                                )}
                            </Button>
                        </motion.div>

                        {/* File Upload Button */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,application/pdf"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileUpload(e.target.files)}
                        />
                        <motion.div whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 rounded-full border-2 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Paperclip className="h-5 w-5" />
                            </Button>
                        </motion.div>

                        {/* Text Input */}
                        <Input
                            placeholder={isListening ? "Listening..." : "Type or speak your message..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                            className="flex-1 rounded-full border-2 border-blue-200 dark:border-blue-500/30 focus:border-blue-400 dark:focus:border-blue-400 bg-white dark:bg-gray-800"
                            disabled={isListening}
                        />

                        {/* Send Button */}
                        <motion.div whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={handleSend}
                                disabled={isLoading || (!input.trim() && uploadedFiles.length === 0)}
                                className="shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                                size="icon"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </motion.div>
                    </div>

                    {/* Voice Visualization */}
                    {isListening && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center justify-center gap-1 py-2"
                        >
                            {Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: [4, Math.random() * 30 + 10, 4],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.05,
                                    }}
                                    className="w-1 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-full"
                                />
                            ))}
                        </motion.div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
