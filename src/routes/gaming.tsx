import { createFileRoute } from "@tanstack/react-router";
import { Catalogue } from "@/components/catalogue";
import { PageHeader } from "@/components/layout";

export const Route = createFileRoute("/gaming")({
  head: () => ({
    meta: [
      { title: "Gaming and Accessories | Sneaker Squad" },
      { name: "description", content: "Gaming consoles and accessories from Sneaker Squad. Enquire on WhatsApp." },
      { property: "og:title", content: "Gaming and Accessories | Sneaker Squad" },
      { property: "og:description", content: "Gaming consoles and accessories from Sneaker Squad. Enquire on WhatsApp." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Play & Listen" title="Gaming and Accessories">Gaming consoles and accessories from Sneaker Squad. Enquire on WhatsApp.</PageHeader>
      <section className="container-x py-10">
        <Catalogue categories={["gaming", "accessories"]} />
      </section>
    </>
  );
}
