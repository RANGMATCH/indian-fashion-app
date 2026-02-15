/**
 * Database-first, AI-fallback strategy per prompt.
 */
import { searchItems } from "@/lib/api/fashion";
import { getAIStylingAdvice } from "@/lib/openai";
import type { SearchFilters } from "@/types/fashion";
import type { UserProfile } from "@/types/fashion";

export async function getRecommendations(
  query: string,
  userProfile: UserProfile
): Promise<
  | { source: "database"; results: Awaited<ReturnType<typeof searchItems>>["data"] }
  | { source: "ai"; advice: string; partialResults: Awaited<ReturnType<typeof searchItems>>["data"] }
> {
  const filters: SearchFilters = {
    skinTone: userProfile.skinTone,
    bodyType: userProfile.bodyType,
    occasion: userProfile.preferredOccasion,
  };
  const { data, error } = await searchItems(query, filters, 0, 20);

  if (data && data.length >= 5) {
    return { source: "database", results: data };
  }

  const aiAdvice = await getAIStylingAdvice(query, {
    userProfile,
    existingResults: data ?? [],
  });

  return {
    source: "ai",
    advice: aiAdvice,
    partialResults: data ?? [],
  };
}
