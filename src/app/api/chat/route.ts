import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are NeuroBuddy Gramin Mitra — a warm, empathetic companion for rural elders. 
Language: use user's preferred language (Odia/Hindi/English). 
Rules: concise (<120 words), one actionable step, never diagnose, if red-flag symptoms appear advise immediate medical attention and provide emergency options. 
Tone: familial, encouraging.`;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!process.env.OPENROUTER_API_KEY) {
            // Mock response if no key
            return NextResponse.json({
                response: "Namaste! I am NeuroBuddy. I am currently in offline mode (API Key missing), but I am here to listen to you. How are you feeling today?"
            });
        }

        // Build messages array for OpenRouter
        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.map((h: any) => ({
                role: h.role === 'user' ? 'user' : 'assistant',
                content: h.content
            })),
            { role: "user", content: message }
        ];

        // Call OpenRouter API
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://brainhope.app", // Optional: your site URL
                "X-Title": "BrainHope NeuroBuddy" // Optional: your app name
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-exp:free", // Using the free Gemini 2.0 Flash model
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("OpenRouter API Error:", response.status, errorData);
            throw new Error(`OpenRouter API error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";

        return NextResponse.json({ response: aiResponse });
    } catch (error: any) {
        console.error("API Error:", error);
        console.error("Error message:", error?.message);
        console.error("Error stack:", error?.stack);
        return NextResponse.json({ response: "Sorry, I'm having trouble thinking right now. Please try again." }, { status: 500 });
    }
}
