import Link from "next/link";

const ITEMS = [
  { id: "1", title: "Office Preview" },
  { id: "2", title: "Wedding Preview" },
  { id: "3", title: "Casual Preview" },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-offwhite px-3 py-4">
      <section className="mx-auto max-w-md rounded-2xl bg-white p-4 shadow-card">
        <h1 className="text-sm font-semibold text-maroon-900">Parallel + Intercepting Routes Gallery</h1>
        <p className="mt-1 text-xs text-maroon-700">Card pe click karne se modal open hota hai (intercept), direct URL pe full page.</p>
      </section>
      <section className="mx-auto mt-3 grid max-w-md gap-2">
        {ITEMS.map((item) => (
          <Link key={item.id} href={`/gallery/item/${item.id}`} className="rounded-xl bg-white px-3 py-3 text-xs font-semibold text-maroon-900 shadow-card">
            {item.title}
          </Link>
        ))}
      </section>
    </main>
  );
}
