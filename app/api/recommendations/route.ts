import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommendations";
import type { UserProfile } from "@/types/fashion";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = typeof body.query === "string" ? body.query : "";
    const userProfile: UserProfile = {
      skinTone: body.skinTone,
      bodyType: body.bodyType,
      preferredOccasion: body.preferredOccasion,
    };

    if (!query.trim()) {
      return NextResponse.json({ error: "query required" }, { status: 400 });
    }

    const result = await getRecommendations(query, userProfile);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Recommendations error:", err);
    return NextResponse.json({ error: "Recommendation failed" }, { status: 500 });
  }
}
