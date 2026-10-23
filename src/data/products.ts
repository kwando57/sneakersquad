/**
 * Sneaker Squad product catalogue.
 * Edit this file to change names, prices, sizes, images or featured status.
 * price: number in rand, or null => "Price on enquiry".
 * availability: only set "in-stock" / "sold-out" once the owner confirms; otherwise "confirm".
 * image: import a real product photo from src/assets and set it here when supplied.
 */
export type Category = "iphones" | "sneakers" | "clothing" | "gaming" | "accessories";
export type Availability = "confirm" | "in-stock" | "sold-out";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number | null;
  storage?: string | undefined;
  listedSizes?: string[] | undefined;
  availability: Availability;
  featured?: boolean | undefined;
  description?: string | undefined;
  ownerNote?: string | undefined;
  image?: string | undefined;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  iphones: "iPhones",
  sneakers: "Sneakers",
  clothing: "Clothing",
  gaming: "Gaming",
  accessories: "Accessories",
};

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => String(a + i));
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const iphones: [string, string | undefined, number][] = [
  ["iPhone XR", "64GB", 4500],
  ["iPhone 11", "64GB", 5500],
  ["iPhone 11 Pro", "64GB", 6900],
  ["iPhone 11 Pro Max", "64GB", 7500],
  ["iPhone 12", "64GB", 6100],
  ["iPhone 12 Pro", "128GB", 7700],
  ["iPhone 12 Pro Max", "128GB", 9700],
  ["iPhone 13", "128GB", 8200],
  ["iPhone 13 Pro", "128GB", 10700],
  ["iPhone 13 Pro Max", "128GB", 12000],
  ["iPhone 14 Plus", "128GB", 10400],
  ["iPhone 14 Pro", "128GB", 12800],
  ["iPhone 14 Pro Max", "128GB", 14500],
  ["iPhone 15", "128GB", 13300],
  ["iPhone 15 Plus", "128GB", 14000],
  ["iPhone 15 Pro", "128GB", 15800],
  ["iPhone 15 Pro Max", "256GB", 18500],
  ["iPhone 16", undefined, 16500],
  ["iPhone 16 Plus", "128GB", 18000],
  ["iPhone 16 Pro", "128GB", 20000],
  ["iPhone 16 Pro Max", "256GB", 24500],
  ["iPhone 17", "256GB", 17500],
  ["iPhone 17 Pro", "256GB", 23500],
  ["iPhone 17 Pro Max", "256GB", 26500],
];

const sneakers: [string, number, string[] | undefined, string?][] = [
  ["Nike Air Max 95", 1400, undefined],
  ["Nike SB Dunk", 1300, range(3, 10)],
  ["Adidas Campus x Bad Bunny", 1400, range(3, 9)],
  ["Timberland x Nike TN Combo", 2600, undefined],
  ["Nike Portal", 1400, undefined],
  ["Nike TN", 1400, undefined],
  ["Puma Mayze", 1200, range(3, 9)],
  ["New Balance 550", 1400, range(3, 9)],
  ["Vans Old Skool Checkerboard", 1300, range(3, 9)],
  ["Nike Furyosa", 1400, range(4, 9)],
  ["Air Jordan 1 High", 1400, range(3, 9)],
  ["Airforce Shell", 1400, range(3, 8)],
  ["Adidas Niteball", 1500, range(3, 9)],
  ["Nike Shox TL", 1400, undefined],
  ["Customised Airforce", 1300, range(3, 12)],
  ["AF1 + Nike Portal Bundle", 3500, undefined, "Listing mentions free delivery — owner to confirm before this is published."],
];

const FEATURED = new Set([
  "iphone-16-pro-max-256gb", "iphone-15-pro-128gb", "iphone-13-128gb",
  "nike-sb-dunk", "new-balance-550", "air-jordan-1-high", "ps5-slim-digital-edition-1tb", "airpods-pro",
]);

export const products: Product[] = [
  ...iphones.map(([name, storage, price]) => {
    const id = slug(`${name} ${storage ?? ""}`);
    return {
      id, name, storage, price, category: "iphones" as const, availability: "confirm" as const,
      featured: FEATURED.has(id),
      ownerNote: storage ? undefined : "Storage capacity not supplied — owner to confirm.",
    };
  }),
  ...sneakers.map(([name, price, listedSizes, ownerNote]) => {
    const id = slug(name);
    return {
      id, name, price, listedSizes, ownerNote, category: "sneakers" as const,
      availability: "confirm" as const, featured: FEATURED.has(id),
    };
  }),
  { id: "ps5-slim-digital-edition-1tb", name: "PS5 Slim Digital Edition", storage: "1TB", price: 11500, category: "gaming", availability: "confirm", featured: true },
  { id: "airpods-pro", name: "AirPods Pro", price: 400, category: "accessories", availability: "confirm", featured: true, ownerNote: "Model generation and condition to be confirmed by the owner." },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (p: number | null) =>
  p == null ? "Price on enquiry" : "R" + p.toLocaleString("en-ZA").replace(/\s|\u00a0/g, ",");
