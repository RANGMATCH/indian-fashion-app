import { TechLab } from "@/components/tech/TechLab";

export default function TechPage() {
  return (
    <main className="min-h-screen bg-offwhite px-3 py-4">
      <section className="mx-auto max-w-md rounded-2xl bg-maroon-900 px-4 py-4 text-white">
        <h1 className="text-sm font-bold">Technology Integration Page</h1>
        <p className="mt-1 text-xs text-white/85">
          Multi-tech demo: Redux, React Router demo, SDUI, dialogs, schema validation, transition animations.
        </p>
      </section>
      <TechLab />
    </main>
  );
}
