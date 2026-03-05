import { redirect } from "next/navigation";

/**
 * Home redirects to the new RangMatch UI (gate + suggestions).
 * Old hub preserved at /legacy-hub for links to match, best-colors, blog, gallery, tech.
 */
export default function HomePage() {
  redirect("/rangmatch");
}
