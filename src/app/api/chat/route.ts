import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are NeuroBuddy Gramin Mitra — a warm, empathetic companion for rural elders. 
Language: use user's preferred language (Odia/Hindi/English). 
Rules: concise (<120 words), one actionable step, never diagnose, if red-flag symptoms appear advise immediate medical attention and provide emergency options. 
Tone: familial, encouraging.`;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            // Mock response if no key
            return NextResponse.json({
                response: "Namaste! I am NeuroBuddy. I am currently in offline mode (API Key missing), but I am here to listen to you. How are you feeling today?"
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Prepend system prompt to history or first message if possible, 
        // but Gemini Pro chat history is strict. We'll just send it as context if needed.
        // For now, we assume the model behaves well or we prepend to the message.

        const chat = model.startChat({
            history: history.map((h: any) => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.content }],
            })) || [],
        });

        const result = await chat.sendMessage(SYSTEM_PROMPT + "\n\nUser: " + message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ response: "Sorry, I'm having trouble thinking right now. Please try again." }, { status: 500 });
    }
}
