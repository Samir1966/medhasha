import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are NeuroBuddy Gramin Mitra — a warm, empathetic companion for rural elders. 
Language: use user's preferred language (Odia/Hindi/English). 
Rules: concise (<120 words), one actionable step, never diagnose, if red-flag symptoms appear advise immediate medical attention and provide emergency options. 
Tone: familial, encouraging.`;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                response: "Namaste! I am NeuroBuddy. I am currently in offline mode (API Key missing), but I am here to listen to you. How are you feeling today?"
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Gemini requires history to start with 'user' role
        let validHistory = history.map((h: any) => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }],
        }));

        // Find the index of the first user message
        const firstUserIndex = validHistory.findIndex((h: any) => h.role === 'user');

        if (firstUserIndex !== -1) {
            validHistory = validHistory.slice(firstUserIndex);
        } else {
            // If no user message found in history, start with empty history
            validHistory = [];
        }

        const chat = model.startChat({
            history: validHistory,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
            systemInstruction: SYSTEM_PROMPT,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ response: "Sorry, I'm having trouble thinking right now. Please try again." }, { status: 500 });
    }
}
