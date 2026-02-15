import { NextResponse } from "next/server";

/**
 * Optional AI chat endpoint. Set OPENAI_API_KEY in env to enable.
 * Otherwise returns a fallback message.
 */
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Please send a text message." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "Aap skin tone aur occasion bataiye, main colors suggest kar sakta hoon. Profile aur Search use karein.",
      });
    }

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert Indian men's fashion stylist. Respond in Hinglish (Hindi + English mix) naturally. Be practical and confidence-building. Suggest colors for Indian skin tones (Fair, Wheatish, Medium, Dusky, Deep), occasions (Wedding, Formal, Casual, Party), and body types. Keep replies concise (2-4 sentences).`,
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, could not generate a reply.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("AI route error:", err);
    return NextResponse.json(
      { reply: "Abhi technical issue aa raha hai. Thodi der baad try karein ya Search / Outfit Builder use karein." },
      { status: 200 }
    );
  }
}
