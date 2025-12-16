// app/api/spell-check/route.ts
import { NextRequest, NextResponse } from "next/server";
import { checkSpelling } from "../../lib/spell";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    // Validation
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required", success: false },
        { status: 400 }
      );
    }

    if (text.length > 50000) {
      return NextResponse.json(
        { error: "Text too long. Maximum 50,000 characters allowed.", success: false },
        { status: 400 }
      );
    }

    // Process text: Preserve line breaks but clean extra whitespace
    // This regex splits by words but keeps punctuation intact for better context if needed later
    // For spell checking, we just need the raw words.
    
    // Pass the raw text to the spell checker utility
    const result = checkSpelling(text);

    return NextResponse.json({
      success: true,
      errors: result.errors,
      stats: result.stats,
    });
  } catch (error: any) {
    console.error("Spell check error:", error);
    return NextResponse.json(
      { error: error.message || "Spell checking failed", success: false },
      { status: 500 }
    );
  }
}