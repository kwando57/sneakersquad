import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Truck, RotateCcw, MessageCircle } from "lucide-react";
import { PageHeader, Reveal, WhatsAppButton } from "@/components/layout";
import { waLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Delivery | Sneaker Squad" },
      { name: "description", content: "Contact Sneaker Squad on WhatsApp at +27 68 211 5106. Delivery options include PEP Paxi and couriers — confirm with us." },
      { property: "og:title", content: "Contact & Delivery | Sneaker Squad" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "WhatsApp Sneaker Squad and ask about delivery options." },
    ],
  }),
  component: Contact,
});

const COURIERS = ["PEP Paxi", "PostNet", "The Courier Guy", "Aramex"];

function Contact() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const text = `Hi Sneaker Squad, my name is ${name.trim() || "[name]"}. ${msg.trim()}`;

  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact & Delivery" />
      <section className="container-x grid gap-6 py-12 lg:grid-cols-2">
        <Reveal className="rounded-2xl border bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold">Sneaker Squad</h2>
          <p className="mt-2 text-muted-foreground">WhatsApp is the quickest way to reach us.</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-5 block font-display text-2xl font-bold text-primary hover:underline">{WHATSAPP_DISPLAY}</a>
          <WhatsAppButton className="mt-6 w-full sm:w-auto" />
        </Reveal>
        <Reveal delay={80} className="rounded-2xl border bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold">Quick enquiry</h2>
          <p className="mt-1 text-sm text-muted-foreground">Write your message here, then send it from WhatsApp. Nothing is sent until you press send in WhatsApp.</p>
          <form className="mt-5 space-y-3" onSubmit={(e) => { e.preventDefault(); window.open(waLink(text), "_blank", "noopener"); }}>
            <input required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" className="w-full rounded-xl border bg-input/30 px-4 py-3 text-sm outline-none focus:border-primary" />
            <textarea required maxLength={600} rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="What would you like to ask?" aria-label="Your message" className="w-full rounded-xl border bg-input/30 px-4 py-3 text-sm outline-none focus:border-primary" />
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition hover:shadow-glow active:scale-[0.98]">
              <MessageCircle className="size-5" /> Continue in WhatsApp
            </button>
          </form>
        </Reveal>
      </section>

      <section className="container-x grid gap-6 pb-6 lg:grid-cols-2">
        <Reveal className="rounded-2xl border bg-card p-6 md:p-8">
          <Truck className="size-7 text-primary" />
          <h2 className="mt-3 text-xl font-bold">Delivery information</h2>
          <p className="mt-2 text-muted-foreground">Delivery options may include the following. Please confirm the method, delivery area, timeframe and fee with us on WhatsApp before ordering.</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {COURIERS.map((c) => <li key={c} className="rounded-full border px-3 py-1.5 text-sm">{c}</li>)}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">Delivery times and costs vary and are not guaranteed until confirmed by Sneaker Squad.</p>
        </Reveal>
        <Reveal delay={80} className="rounded-2xl border bg-card p-6 md:p-8">
          <div id="returns" className="scroll-mt-24" />
          <RotateCcw className="size-7 text-primary" />
          <h2 className="mt-3 text-xl font-bold">Returns & lay-by</h2>
          <p className="mt-2 text-muted-foreground">Our returns, refund and lay-by terms are being finalised. Please ask us on WhatsApp about returns, exchanges or lay-by before you buy.</p>
        </Reveal>
      </section>
    </>
  );
}
