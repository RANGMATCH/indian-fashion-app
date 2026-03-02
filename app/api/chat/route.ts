import { NextResponse } from "next/server";
import { TRENDING_COMBOS } from "@/lib/data/trendingCombos";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Please send a text message." }, { status: 400 });
    }

    const deepSeekApiKey = process.env.DEEPSEEK_API_KEY;
    const openAiApiKey = process.env.OPENAI_API_KEY;
    const apiKey = deepSeekApiKey ?? openAiApiKey;

    if (!apiKey) {
      return NextResponse.json({
        reply: "Namaste! Skin tone aur occasion batayein, main quick color combos suggest karta hoon.",
      });
    }

    const OpenAI = (await import("openai")).default;
    const model = deepSeekApiKey
      ? process.env.DEEPSEEK_MODEL ?? "deepseek-chat"
      : process.env.OPENAI_MODEL ?? "gpt-4o-mini";
    const baseURL = deepSeekApiKey ? process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com" : undefined;
    const openai = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            `You are RangMatch Advisor for Indian men's fashion. Respond in practical Hinglish in 2-4 sentences with color-focused outfit suggestions. Use these trending anchors when relevant: ${TRENDING_COMBOS.map((combo) => combo.name).join(", ")}.`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 220,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, could not generate a reply.";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { reply: "Abhi temporary issue hai. Thodi der baad try karein." },
      { status: 200 }
    );
  }
}
