import { createFileRoute } from "@tanstack/react-router";
import { Catalogue } from "@/components/catalogue";
import { PageHeader } from "@/components/layout";

export const Route = createFileRoute("/sneakers")({
  head: () => ({
    meta: [
      { title: "Sneakers | Sneaker Squad" },
      { name: "description", content: "Sneaker Squad sneaker range with listed sizes. Choose a size and confirm stock on WhatsApp." },
      { property: "og:title", content: "Sneakers | Sneaker Squad" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "Sneaker Squad sneaker range with listed sizes. Choose a size and confirm stock on WhatsApp." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Kicks" title="Sneakers">Sneaker Squad sneaker range with listed sizes. Choose a size and confirm stock on WhatsApp.</PageHeader>
      <section className="container-x py-10">
        <Catalogue categories={["sneakers"]} />
      </section>
    </>
  );
}
