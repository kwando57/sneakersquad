import { createFileRoute } from "@tanstack/react-router";
import { Catalogue } from "@/components/catalogue";
import { PageHeader } from "@/components/layout";

export const Route = createFileRoute("/iphones")({
  head: () => ({
    meta: [
      { title: "iPhones | Sneaker Squad" },
      { name: "description", content: "iPhone models and storage options from Sneaker Squad. Condition and availability confirmed on WhatsApp." },
      { property: "og:title", content: "iPhones | Sneaker Squad" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:description", content: "iPhone models and storage options from Sneaker Squad. Condition and availability confirmed on WhatsApp." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Tech" title="iPhones">iPhone models and storage options from Sneaker Squad. Condition and availability confirmed on WhatsApp.</PageHeader>
      <section className="container-x py-10">
        <Catalogue categories={["iphones"]} />
      </section>
    </>
  );
}
