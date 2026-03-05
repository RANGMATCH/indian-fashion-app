export default function GalleryItemPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-offwhite px-3 py-4">
      <section className="mx-auto max-w-md rounded-2xl bg-white p-4 shadow-card">
        <h1 className="text-sm font-semibold text-maroon-900">Full Page Item #{params.id}</h1>
        <p className="mt-1 text-xs text-maroon-700">Direct URL access: yeh full page route hai, modal intercept nahi.</p>
      </section>
    </main>
  );
}
