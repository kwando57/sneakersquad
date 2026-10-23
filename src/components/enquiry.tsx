import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, formatPrice, type Product } from "@/data/products";
import { listMessage, waLink } from "@/lib/whatsapp";
import { X, Trash2, MessageCircle } from "lucide-react";

interface Item { id: string; size?: string }
interface Ctx {
  items: { product: Product; size?: string; key: string }[];
  add: (id: string, size?: string) => void;
  remove: (key: string) => void;
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
    setRaw((prev) => {
      if (prev.some((i) => i.id === id && i.size === size)) return prev;
      const next = [...prev, { id, size }];
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

  const items = raw
    .map((i) => ({ product: getProduct(i.id)!, size: i.size, key: `${i.id}|${i.size ?? ""}` }))
    .filter((i) => i.product);

  return (
    <EnquiryCtx.Provider
      value={{
        items, add, open, setOpen, bump,
        remove: (key) => persist(raw.filter((i) => `${i.id}|${i.size ?? ""}` !== key)),
        clear: () => persist([]),
      }}
    >
      {children}
      <EnquiryDrawer />
      {toast && (
        <div role="status" className="animate-toast fixed bottom-6 left-1/2 z-[70] w-[min(92vw,26rem)] -translate-x-1/2 rounded-xl border border-primary/40 bg-popover px-4 py-3 text-sm shadow-glow">
          <span className="font-semibold text-accent">✓ </span>{toast}
          <button onClick={() => { setToast(null); setOpen(true); }} className="ml-2 font-semibold text-primary underline-offset-2 hover:underline">View list</button>
        </div>
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
  const { items, remove, clear, open, setOpen } = useEnquiry();
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
          <h2 className="text-lg font-bold">Enquiry list</h2>
          <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-muted"><X className="size-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="py-16 text-center text-muted-foreground">Your list is empty. Add products to ask about several items in one WhatsApp message.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.key} className="flex items-start justify-between gap-3 rounded-xl border bg-card p-4">
                  <div>
                    <p className="font-semibold">{it.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {[it.product.storage, it.size && `Size ${it.size}`].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-1 font-bold text-accent">{formatPrice(it.product.price)}</p>
                  </div>
                  <button onClick={() => remove(it.key)} aria-label={`Remove ${it.product.name}`} className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"><Trash2 className="size-4" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="space-y-3 border-t p-5">
            <p className="text-xs text-muted-foreground">
              This opens WhatsApp with your list. Nothing is ordered or paid on this website — Sneaker Squad will confirm availability, final pricing and delivery with you.
            </p>
            <a href={waLink(listMessage(items))} target="_blank" rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-bold text-whatsapp-foreground transition hover:brightness-110 active:scale-[0.98]">
              <MessageCircle className="size-5" /> Send list on WhatsApp
            </a>
            <button onClick={clear} className="w-full text-sm text-muted-foreground hover:text-foreground">Clear list</button>
          </div>
        )}
      </aside>
    </div>
  );
}
