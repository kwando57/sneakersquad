import { createFileRoute } from "@tanstack/react-router";
import catClothing from "@/assets/cat-clothing.jpg";
import { PageHeader, WhatsAppButton } from "@/components/layout";

export const Route = createFileRoute("/clothing")({
  head: () => ({
    meta: [
      { title: "Clothing | Sneaker Squad" },
      { name: "description", content: "Sneaker Squad streetwear clothing — new products coming soon. Ask about current clothing on WhatsApp." },
      { property: "og:title", content: "Clothing | Sneaker Squad" },
      { property: "og:description", content: "Streetwear from Sneaker Squad — products coming soon." },
    ],
  }),
  component: Clothing,
});

function Clothing() {
  return (
    <>
      <PageHeader eyebrow="Streetwear" title="Clothing" />
      <section className="container-x py-12">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border bg-card md:grid-cols-2">
          <img src={catClothing} alt="Folded black hoodie and t-shirt" loading="lazy" width={800} height={1008} className="aspect-[4/3] size-full object-cover md:aspect-auto md:h-full" />
          <div className="p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Products coming soon</p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">Our clothing range is on its way</h2>
            <p className="mt-4 text-muted-foreground">We're preparing our streetwear catalogue. In the meantime, message us on WhatsApp to ask what clothing is currently available.</p>
            <WhatsAppButton className="mt-6" text="Hi Sneaker Squad, I would like to ask about the clothing you currently have available.">Ask about clothing</WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
