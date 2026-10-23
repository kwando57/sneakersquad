import { createFileRoute } from "@tanstack/react-router";
import { Catalogue } from "@/components/catalogue";
import { PageHeader } from "@/components/layout";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All | Sneaker Squad" },
      { name: "description", content: "Browse every Sneaker Squad product in rand. Pick what you like and enquire on WhatsApp." },
      { property: "og:title", content: "Shop All | Sneaker Squad" },
      { property: "og:description", content: "Browse every Sneaker Squad product in rand. Pick what you like and enquire on WhatsApp." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Catalogue" title="Shop All">Browse every Sneaker Squad product in rand. Pick what you like and enquire on WhatsApp.</PageHeader>
      <section className="container-x py-10">
        <Catalogue  />
      </section>
    </>
  );
}
