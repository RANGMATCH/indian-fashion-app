import { notFound } from "next/navigation";
import Link from "next/link";
import { getItem } from "@/lib/api/fashion";
import { ConfidenceIndicator } from "@/components/ConfidenceIndicator";
import { SocialApprovalScore } from "@/components/SocialApprovalScore";
import { getHexForItem } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";

export default async function ItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: item, error } = await getItem(params.id);
  if (error || !item) notFound();

  const hex = getHexForItem(item);
  const title = item.keyword_hindi || item.keyword_english || item.sub_category || "Item";

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 pb-24 md:pb-8">
      <Link
        href="/search"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary-navy hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to search
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-grey/20 bg-white shadow-card">
          <div
            className="h-full w-full"
            style={{ backgroundColor: hex }}
            aria-hidden
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-neutral-black md:text-3xl">
            {title}
          </h1>
          {item.keyword_hindi && item.keyword_english && (
            <p className="mt-1 font-hindi text-neutral-grey">
              {item.keyword_hindi} · {item.keyword_english}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {item.occasion && (
              <span className="rounded-full bg-primary-navy/10 px-3 py-1 text-sm text-primary-navy">
                {item.occasion}
              </span>
            )}
            {item.skin_tone && (
              <span className="rounded-full bg-primary-maroon/10 px-3 py-1 text-sm text-primary-maroon">
                {item.skin_tone}
              </span>
            )}
            {item.confidence_level && (
              <span className="rounded-full bg-accent-olive/10 px-3 py-1 text-sm text-accent-olive">
                {item.confidence_level}
              </span>
            )}
          </div>

          {item.price_range && (
            <p className="mt-4 text-xl font-semibold text-neutral-black">
              {item.price_range}
            </p>
          )}

          <div className="mt-6 space-y-4">
            <ConfidenceIndicator level={item.confidence_level} showHindi />
            {item.social_approval_score && (
              <SocialApprovalScore score={item.social_approval_score} />
            )}
          </div>

          {item.body_type_hack && (
            <div className="mt-6 rounded-xl bg-neutral-cream/80 p-4">
              <p className="text-sm text-neutral-black">
                <strong>Tip:</strong> {item.body_type_hack}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/outfit-builder`}
              className="flex-1 rounded-xl bg-primary-navy px-6 py-3 text-center font-medium text-white shadow-card hover:bg-primary-navy/90"
            >
              Add to Outfit
            </Link>
            <Link
              href="/search"
              className="rounded-xl border-2 border-neutral-grey/50 px-6 py-3 font-medium hover:bg-neutral-grey/10"
            >
              View similar
            </Link>
          </div>
        </div>
      </div>

      {item.solves_problem && (
        <div className="mt-8 rounded-xl border border-accent-olive/30 bg-white p-4">
          <p className="text-sm text-neutral-black">
            <strong>Solves:</strong> {item.solves_problem}
          </p>
        </div>
      )}
    </div>
  );
}
