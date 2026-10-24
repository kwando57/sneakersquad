import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Reveal, WhatsAppButton } from "@/components/layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Sneaker Squad" },
      { name: "description", content: "Sneaker Squad is a South African online store offering sneakers and iPhones." },
      { property: "og:title", content: "About Sneaker Squad" },
      { property: "og:description", content: "A South African online store for sneakers and iPhones." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About Us" title="Welcome to Sneaker Squad" />
      <section className="container-x max-w-3xl py-14">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p><span className="font-semibold text-foreground">Welcome to Sneaker Squad</span>, a South African online retail store offering a selection of sneakers and iPhones.</p>
          <p>Our aim is to make it easy for customers to explore our products and contact us directly for enquiries and orders. Browse the collection, choose what interests you and speak to our team on WhatsApp for assistance.</p>
        </Reveal>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to="/shop" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition hover:shadow-glow">Browse the collection</Link>
          <WhatsAppButton />
        </div>
      </section>
    </>
  );
}
