import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, formatPrice, type Product } from "@/data/products";
import { listMessage, waLink } from "@/lib/whatsapp";
import { X, Trash2, MessageCircle } from "lucide-react";
import { enquiryTotal } from "@/lib/enquiry-total";
import { ProductImage } from "./product-image";
import { Button } from "./ui/button";

interface Item { id: string; size?: string | undefined; uid: string }
interface Ctx {
  items: { product: Product; size?: string | undefined; key: string }[];
  add: (id: string, size?: string) => void;
  remove: (key: string) => void;
  setSize: (key: string, size: string | undefined) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  bump: number;
}
const EnquiryCtx = createContext<Ctx | null>(null);
const KEY = "sneaker-squad-enquiry";

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try { setRaw(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
  }, []);
  const persist = (next: Item[]) => {
    setRaw(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const add = useCallback((id: string, size?: string) => {
    // Every add creates its own entry — the same product may be enquired about more than once.
    setRaw((prev) => {
      const next = [...prev, { id, size, uid: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}` }];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    setBump((b) => b + 1);
    const p = getProduct(id);
    setToast(`${p?.name ?? "Item"}${size ? ` (size ${size})` : ""} added to your enquiry list`);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  // Legacy saved lists have no uid — fall back to the old id|size key so they still render and remove.
  const legacyKey = (i: Item) => i.uid || `${i.id}|${i.size ?? ""}`;
  const items = raw.flatMap((i) => {
    const product = getProduct(i.id);
    return product ? [{ product, size: i.size, key: legacyKey(i) }] : [];
  });

  return (
    <EnquiryCtx.Provider
      value={{
        items, add, open, setOpen, bump,
        remove: (key) => persist(raw.filter((i) => legacyKey(i) !== key)),
        clear: () => persist([]),
        setSize: (key, size) => persist(raw.map((i) => (legacyKey(i) === key ? { ...i, size } : i))),
      }}
    >
      {children}
      <EnquiryDrawer />
      {toast && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4"><div role="status" className="animate-toast pointer-events-auto w-full max-w-md rounded-xl border border-primary/40 bg-popover px-4 py-3 text-sm shadow-glow">
          <span className="font-semibold text-accent">✓ </span>{toast}
          <Button variant="link" onClick={() => { setToast(null); setOpen(true); }} className="ml-2 h-auto p-0 font-semibold">View list</Button>
        </div></div>
      )}
    </EnquiryCtx.Provider>
  );
}

export const useEnquiry = () => {
  const c = useContext(EnquiryCtx);
  if (!c) throw new Error("useEnquiry outside provider");
  return c;
};

function EnquiryDrawer() {
  const { items, remove, setSize, clear, open, setOpen } = useEnquiry();
  const total = enquiryTotal(items);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        role="dialog" aria-label="Your enquiry list"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-popover transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <div><p className="mb-1 text-xs font-semibold uppercase text-primary">Sneaker Squad</p><h2 className="text-lg font-bold">Enquiry list <span className="font-sans text-sm text-muted-foreground">({items.length})</span></h2></div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close"><X className="size-5" /></Button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">Your list is empty. Add products to ask about several items in one WhatsApp message.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.key} className="flex items-start gap-3 border-b py-4">
                  <div className="size-16 shrink-0 overflow-hidden rounded-md bg-surface-product"><ProductImage src={it.product.image} alt={it.product.name} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{it.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {[it.product.storage, !it.product.listedSizes?.length && it.size && `Size ${it.size}`].filter(Boolean).join(" · ")}
                    </p>
                    {it.product.listedSizes?.length ? (
                      <label className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        Size
                        <select
                          value={it.size ?? ""}
                          onChange={(e) => setSize(it.key, e.target.value || undefined)}
                          aria-label={`Size for ${it.product.name}`}
                          className="rounded-md border bg-background px-2 py-1 text-foreground"
                        >
                          <option value="">Choose size</option>
                          {it.product.listedSizes.map((s) => <option key={s} value={s}>Size {s}</option>)}
                        </select>
                      </label>
                    ) : null}
                    <p className="mt-1 font-bold text-accent">{formatPrice(it.product.price)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => remove(it.key)} aria-label={`Remove ${it.product.name}`} className="shrink-0 text-muted-foreground"><Trash2 className="size-4" /></Button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="space-y-3 border-t p-5">
            <div className="flex items-baseline justify-between gap-3" aria-live="polite">
              <span className="text-sm font-semibold">{total.unpriced ? "Priced items subtotal" : "Listed items total"}</span>
              <span className="text-2xl font-extrabold tabular-nums text-accent" data-testid="enquiry-total">{formatPrice(total.amount)}</span>
            </div>
            {total.unpriced > 0 && <p className="text-xs text-warning">{total.unpriced} {total.unpriced === 1 ? "item needs" : "items need"} a price confirmed.</p>}
            <p className="text-xs text-muted-foreground">Delivery not included. Final prices confirmed on WhatsApp.</p>
            <p className="text-xs text-muted-foreground">
              This opens WhatsApp with your list. Nothing is ordered or paid on this website — Sneaker Squad will confirm availability, final pricing and delivery with you.
            </p>
            <Button asChild className="h-12 w-full bg-whatsapp font-bold text-whatsapp-foreground hover:bg-whatsapp/90"><a href={waLink(listMessage(items))} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" /> Send list on WhatsApp
            </a></Button>
            <Button variant="ghost" onClick={clear} className="w-full text-sm text-muted-foreground">Clear list</Button>
          </div>
        )}
      </aside>
    </div>
  );
}
