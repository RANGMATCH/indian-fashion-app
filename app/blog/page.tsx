import Link from "next/link";

const BLOG_POSTS = [
  { slug: "wheatish-safe-shirt-colors", title: "Wheatish skin ke liye 5 safest shirt colors" },
  { slug: "delhi-groom-kurta-combos", title: "Shaadi season: Delhi grooms ke top 3 kurta-pajama combos" },
  { slug: "office-colors-understated", title: "Office weekdays ke liye low-effort high-style color formulas" },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-offwhite px-4 py-6">
      <header className="mb-6 rounded-2xl bg-white p-5 shadow-card">
        <h1 className="text-2xl font-semibold text-maroon-900">RangMatch Blog</h1>
        <p className="mt-1 text-sm text-maroon-700">Practical styling tips in Hindi + English.</p>
      </header>

      <section className="space-y-3">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="rounded-xl border border-maroon-200 bg-white p-4">
            <h2 className="text-base font-semibold text-maroon-900">{post.title}</h2>
            <p className="mt-1 text-sm text-maroon-700">Read quick guide and try combos in Match screen.</p>
          </article>
        ))}
      </section>

      <div className="mt-6">
        <Link className="text-sm font-semibold text-maroon-800 underline" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
