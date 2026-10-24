import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layers, MessageCircle, Truck, UserRound } from "lucide-react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/catalogue";
import { Reveal, WhatsAppButton } from "@/components/layout";
import { ProductImage } from "@/components/product-image";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sneaker Squad — Your Style. Your Tech. Your Squad." },
      { name: "description", content: "Browse sneakers and iPhones at Sneaker Squad, South Africa. Enquire and order on WhatsApp." },
      { property: "og:title", content: "Sneaker Squad — Your Style. Your Tech. Your Squad." },
      { property: "og:description", content: "Sneakers and iPhones. Enquire on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const CATS = [
  { to: "/iphones", label: "iPhones" },
  { to: "/sneakers", label: "Sneakers" },
] as const;

const WHY = [
  { icon: Layers, title: "Lifestyle & tech range", text: "Sneakers and iPhones in one place." },
  { icon: MessageCircle, title: "Easy WhatsApp enquiries", text: "Message us directly about any product — no account needed." },
  { icon: Truck, title: "Delivery options", text: "Courier options available — confirm the method, timing and fee with us." },
  { icon: UserRound, title: "Personal assistance", text: "Talk to a real person who helps you find the right product." },
];

function Home() {
  const featured = products.filter((p) => p.featured);
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="container-x flex min-h-[78vh] flex-col justify-center py-20">
          <p className="animate-hero text-xs font-bold uppercase tracking-[0.3em] text-primary">Sneaker Squad · South Africa</p>
          <h1 className="animate-hero mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl" style={{ animationDelay: "120ms" }}>
            YOUR STYLE.<br />YOUR TECH.<br /><span className="text-primary">YOUR SQUAD.</span>
          </h1>
          <p className="animate-hero mt-6 max-w-xl text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "240ms" }}>
            Discover sneakers and iPhones at Sneaker Squad. Browse our collection and contact us on WhatsApp to enquire about your next purchase.
          </p>
          <div className="animate-hero mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "360ms" }}>
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-primary-foreground transition hover:shadow-glow active:scale-[0.97]">
              Shop Collection <ArrowRight className="size-5" />
            </Link>
            <WhatsAppButton className="py-3.5" />
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <Reveal><h2 className="text-2xl font-bold md:text-3xl">Shop by category</h2></Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
          {CATS.map((c, i) => (
            <Reveal key={c.label} delay={i * 70}>
              <Link to={c.to} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border transition hover:border-primary/50">
                <ProductImage alt={`${c.label} category`} />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                  <span className="font-display text-base font-bold">{c.label}</span>
                  <ArrowRight className="size-5 text-primary transition group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-12">
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold md:text-3xl">Featured products</h2>
          <Link to="/shop" className="shrink-0 text-sm font-semibold text-primary hover:underline">View all →</Link>
        </Reveal>
        <Reveal className="mt-8"><ProductGrid items={featured} /></Reveal>
      </section>

      <section className="container-x py-16">
        <Reveal><h2 className="text-2xl font-bold md:text-3xl">Why shop with Sneaker Squad?</h2></Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="h-full rounded-2xl border bg-card p-6">
                <w.icon className="size-7 text-primary" />
                <h3 className="mt-4 font-sans text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x">
        <Reveal>
          <div className="bg-glow relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-14 text-center md:py-20">
            <h2 className="text-3xl font-extrabold md:text-5xl">FOUND SOMETHING YOU LIKE?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Contact Sneaker Squad on WhatsApp to check availability, confirm the price and discuss delivery.</p>
            <WhatsAppButton className="mt-8 px-8 py-4">Chat With Us</WhatsAppButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
