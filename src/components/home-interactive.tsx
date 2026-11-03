import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { CATEGORY_LABELS, formatPrice, type Product } from "@/data/products";
import { productMessage, waLink } from "@/lib/whatsapp";
import { ProductImage } from "@/components/product-image";

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Soft cyan glow that follows the pointer across the hero. */
export function HeroGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || reduceMotion()) return;
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--gx", `${e.clientX - r.left}px`);
      el.style.setProperty("--gy", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("pointermove", move);
    return () => parent.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} aria-hidden className="hero-glow pointer-events-none absolute inset-0 -z-10" />;
}

const TICKER = ["Sneakers", "iPhones", "Sizes 1–10", "Prices in Rand", "WhatsApp Enquiries", "South Africa"];

/** Infinite scrolling strip; pauses on hover, disabled for reduced motion. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {TICKER.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 font-display text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">{t}</span>
          <span className="size-1.5 rounded-full bg-primary" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee overflow-hidden border-y border-primary/15 bg-secondary/40 py-4">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Auto-rotating showcase of featured products with arrows, dots and keyboard support. */
export function FeaturedCarousel({ items }: { items: Product[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2 || reduceMotion()) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(t);
  }, [paused, count]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  if (count === 0) return null;
  const current = items[index]!;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group/car relative rounded-2xl focus-visible:outline-2 focus-visible:outline-ring"
    >
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((p) => (
            <div key={p.id} className="grid w-full shrink-0 gap-6 p-5 sm:grid-cols-2 sm:gap-10 sm:p-10" aria-hidden={p.id !== current.id}>
              <div className="aspect-square overflow-hidden rounded-xl bg-surface-product">
                <ProductImage src={p.image} alt={p.name} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{CATEGORY_LABELS[p.category]}</p>
                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{p.name}</h3>
                {p.storage && <p className="mt-1 text-sm text-muted-foreground">{p.storage}</p>}
                <p className="mt-3 text-2xl font-extrabold text-primary">{formatPrice(p.price)}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={waLink(productMessage(p))}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={p.id === current.id ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-bold text-whatsapp-foreground transition hover:brightness-110 active:scale-[0.97]"
                  >
                    <MessageCircle className="size-4" /> Enquire on WhatsApp
                  </a>
                  <Link
                    to={p.category === "iphones" ? "/iphones" : "/sneakers"}
                    tabIndex={p.id === current.id ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold transition hover:border-primary/60 hover:text-primary"
                  >
                    View {CATEGORY_LABELS[p.category]}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous featured product"
        className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border bg-background/80 text-foreground backdrop-blur transition hover:border-primary hover:text-primary sm:opacity-0 sm:group-hover/car:opacity-100 sm:focus-visible:opacity-100"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next featured product"
        className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border bg-background/80 text-foreground backdrop-blur transition hover:border-primary hover:text-primary sm:opacity-0 sm:group-hover/car:opacity-100 sm:focus-visible:opacity-100"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="mt-4 flex justify-center gap-2">
        {items.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${p.name}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"}`}
          />
        ))}
      </div>
    </div>
  );
}
