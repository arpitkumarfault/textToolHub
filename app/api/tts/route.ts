// app/api/tts/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const text = searchParams.get("text");
    const lang = searchParams.get("lang") || "en";
    if (!text) {
        return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        text
    )}&tl=${lang}&client=tw-ob`;

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch audio from TTS provider");
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Return the MP3 file directly
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Disposition": `attachment; filename="speech.mp3"`,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to generate audio" },
            { status: 500 }
        );
    }
}