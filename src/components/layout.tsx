import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, ShoppingBag, MessageCircle } from "lucide-react";
import { useEnquiry } from "./enquiry";
import { generalMessage, waLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Sneaker Squad home">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <rect width="32" height="32" rx="9" className="fill-primary" />
        <path d="M6 20c3 0 5-1 7-4l2 2c1 1 3 1 4 0l1-1 6 3v3H6z" className="fill-primary-foreground" />
      </svg>
      <span className="font-display text-sm font-bold tracking-wider sm:text-base">SNEAKER<span className="text-primary"> SQUAD</span></span>
    </Link>
  );
}

const NAV = [
  { to: "/shop", label: "Shop All" },
  { to: "/iphones", label: "iPhones" },
  { to: "/sneakers", label: "Sneakers" },
  { to: "/clothing", label: "Clothing" },
  { to: "/gaming", label: "Gaming & Accessories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact & Delivery" },
] as const;

export function WhatsAppButton({ text = generalMessage, children = "Chat on WhatsApp", className = "" }: { text?: string; children?: ReactNode; className?: string }) {
  return (
    <a href={waLink(text)} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-whatsapp-foreground transition hover:brightness-110 active:scale-[0.97] ${className}`}>
      <MessageCircle className="size-5" /> {children}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { items, setOpen: openList, bump } = useEnquiry();
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "text-foreground bg-muted" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => openList(true)} aria-label={`Enquiry list, ${items.length} items`} className="relative rounded-full p-2.5 transition hover:bg-muted">
            <ShoppingBag className="size-5" />
            {items.length > 0 && (
              <span key={bump} className="animate-pop absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">{items.length}</span>
            )}
          </button>
          <a href={waLink(generalMessage)} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:shadow-glow sm:inline-flex">WhatsApp</a>
          <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="rounded-full p-2.5 hover:bg-muted lg:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div className={`grid overflow-hidden transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0">
          <nav className="container-x flex flex-col gap-1 pb-5 pt-2">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-muted">Home</Link>
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold hover:bg-muted" activeProps={{ className: "bg-muted text-primary" }}>{n.label}</Link>
            ))}
            <WhatsAppButton className="mt-3 w-full">Chat on WhatsApp</WhatsAppButton>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/50">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">Sneakers, iPhones, clothing, gaming and accessories. Browse online and enquire with Sneaker Squad on WhatsApp.</p>
          <a href={waLink(generalMessage)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-primary hover:underline">WhatsApp: {WHATSAPP_DISPLAY}</a>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Shop</h3>
          <ul className="space-y-2 text-sm">
            {NAV.slice(0, 5).map((n) => <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Info</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact & Delivery</Link></li>
            <li><Link to="/contact" hash="returns" className="hover:text-primary">Returns & Lay-by</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Sneaker Squad. All rights reserved.</div>
    </footer>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="bg-glow border-b">
      <div className="container-x animate-hero py-14 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}
