import { useMemo, useState } from "react";
import { Search, Plus, MessageCircle, Smartphone, Footprints, Gamepad2, Headphones, Shirt } from "lucide-react";
import { products, formatPrice, CATEGORY_LABELS, type Category, type Product } from "@/data/products";
import { productMessage, waLink } from "@/lib/whatsapp";
import { useEnquiry } from "./enquiry";

const ICONS: Record<Category, typeof Smartphone> = {
  iphones: Smartphone, sneakers: Footprints, gaming: Gamepad2, accessories: Headphones, clothing: Shirt,
};

export function ProductCard({ product }: { product: Product }) {
  const { add } = useEnquiry();
  const [size, setSize] = useState("");
  const Icon = ICONS[product.category];
  const needsSize = !!product.listedSizes?.length;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {product.image ? (
          <img src={product.image} alt={`${product.name}${product.storage ? ` ${product.storage}` : ""}`} loading="lazy" className="size-full object-cover transition duration-500 md:group-hover:scale-105" />
        ) : (
          <div className="bg-glow flex size-full flex-col items-center justify-center gap-3 p-4 text-center transition duration-500 md:group-hover:scale-105">
            <Icon className="size-12 text-primary/70" strokeWidth={1.4} aria-hidden />
            <span className="font-display text-sm font-bold leading-tight">{product.name}</span>
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Photo coming soon</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">{CATEGORY_LABELS[product.category]}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-sans text-base font-bold leading-snug">{product.name}</h3>
        {product.storage && <span className="w-fit rounded-md border border-primary/40 px-2 py-0.5 text-xs font-bold text-accent">{product.storage}</span>}
        <p className="text-xl font-extrabold">{formatPrice(product.price)}</p>
        <p className="text-xs text-muted-foreground">
          {product.availability === "in-stock" ? "In stock" : product.availability === "sold-out" ? "Sold out" : "Availability: confirm on WhatsApp"}
        </p>
        {needsSize && (
          <label className="text-xs text-muted-foreground">
            Listed sizes — stock to be confirmed
            <select value={size} onChange={(e) => setSize(e.target.value)} className="mt-1 w-full rounded-lg border bg-input/40 px-3 py-2 text-sm text-foreground">
              <option value="">Choose a size (optional)</option>
              {product.listedSizes!.map((s) => <option key={s} value={s}>Size {s}</option>)}
            </select>
          </label>
        )}
        {product.ownerNote && <p className="rounded-md bg-warning/10 px-2 py-1 text-[11px] text-warning">{product.ownerNote}</p>}
        <div className="mt-auto flex gap-2 pt-2">
          <a href={waLink(productMessage(product, size || undefined))} target="_blank" rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2.5 text-sm font-bold text-primary-foreground transition hover:brightness-110 active:scale-[0.97]">
            <MessageCircle className="size-4" /> Enquire
          </a>
          <button onClick={() => add(product.id, size || undefined)} aria-label={`Add ${product.name} to enquiry list`}
            className="grid size-10 shrink-0 place-items-center rounded-full border transition hover:border-primary hover:text-primary active:scale-90">
            <Plus className="size-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

type Sort = "default" | "asc" | "desc";

export function Catalogue({ categories }: { categories?: Category[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("default");
  const base = categories ? products.filter((p) => categories.includes(p.category)) : products;
  const chips = (categories ?? (["iphones", "sneakers", "gaming", "accessories"] as Category[]));

  const list = useMemo(() => {
    let r = base.filter((p) => (cat === "all" || p.category === cat) && `${p.name} ${p.storage ?? ""}`.toLowerCase().includes(q.trim().toLowerCase()));
    if (sort !== "default") r = [...r].sort((a, b) => ((a.price ?? Infinity) - (b.price ?? Infinity)) * (sort === "asc" ? 1 : -1));
    return r;
  }, [base, cat, q, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search products</span>
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search e.g. iPhone 15 or Dunk" className="w-full rounded-full border bg-card py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary" />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort by price" className="rounded-full border bg-card px-4 py-3 text-sm">
          <option value="default">Sort: Featured</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </div>
      {chips.length > 1 && (
        <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
          {(["all", ...chips] as const).map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50"}`}>
              {c === "all" ? "All" : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      )}
      <p className="mb-4 text-sm text-muted-foreground">{list.length} product{list.length === 1 ? "" : "s"}</p>
      {list.length ? <ProductGrid items={list} /> : (
        <div className="rounded-2xl border border-dashed py-16 text-center text-muted-foreground">No products match your search. Try a different name or category.</div>
      )}
      <p className="mt-8 text-xs text-muted-foreground">Listed prices are subject to confirmation. Please confirm availability, final pricing, condition and delivery with Sneaker Squad on WhatsApp before purchasing.</p>
    </div>
  );
}
