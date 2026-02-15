/**
 * AI styling advice via OpenAI. Used by recommendations fallback.
 */

export async function getAIStylingAdvice(query: string, context: unknown): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "Aap skin tone aur occasion bataiye. Profile aur Search use karein.";
  }

  const OpenAI = (await import("openai")).default;
  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert Indian men's fashion stylist. You understand Indian skin tones, body types, and occasions. Respond in Hindi-English mix (Hinglish) naturally. Be practical and confidence-building, not judgmental. Context: ${JSON.stringify(context)}`,
      },
      { role: "user", content: query },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0]?.message?.content ?? "Sorry, could not generate advice.";
}
