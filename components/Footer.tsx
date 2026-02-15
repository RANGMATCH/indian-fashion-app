import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-neutral-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-semibold text-primary-orange">RangMatch</h3>
            <p className="mt-1 text-sm opacity-90">
              Indian Men&apos;s Fashion Intelligence — skin tone, occasion & body type.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Explore</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/search" className="hover:underline">Search</Link></li>
              <li><Link href="/outfit-builder" className="hover:underline">Outfit Builder</Link></li>
              <li><Link href="/occasions" className="hover:underline">Occasions</Link></li>
              <li><Link href="/style-guide" className="hover:underline">Style Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Help</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><Link href="/chat" className="hover:underline">AI Stylist</Link></li>
              <li><Link href="/profile" className="hover:underline">Profile</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm opacity-80">
          © {new Date().getFullYear()} RangMatch. Built for Indian men&apos;s fashion.
        </div>
      </div>
    </footer>
  );
}
