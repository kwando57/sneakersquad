/**
 * Sneaker Squad product catalogue.
 * Edit this file to change names, prices, sizes, images or featured status.
 * price: number in rand, or null => "Price on enquiry".
 * availability: only set "in-stock" / "sold-out" once the owner confirms; otherwise "confirm".
 * image: import a real product photo from src/assets and set it here when supplied.
 */
import imgAirMax95 from "@/assets/products/nike-air-max-95.jpg.asset.json";
import imgSbDunk from "@/assets/products/nike-sb-dunk.jpg.asset.json";
import imgCampusBadBunny from "@/assets/products/adidas-campus-bad-bunny.jpg.asset.json";
import imgTnCombo from "@/assets/products/timberland-nike-tn-combo.jpg.asset.json";
import imgPortal from "@/assets/products/nike-portal.jpg.asset.json";
import imgTn from "@/assets/products/nike-tn.jpg.asset.json";
import imgMayze from "@/assets/products/puma-mayze.jpg.asset.json";
import imgNb550 from "@/assets/products/new-balance-550.jpg.asset.json";
import imgVansCheckerboard from "@/assets/products/vans-old-skool-checkerboard.jpg.asset.json";
import imgFuryosa from "@/assets/products/nike-furyosa.jpg.asset.json";
import imgJordan1High from "@/assets/products/air-jordan-1-high.jpg.asset.json";
import imgAirforceShell from "@/assets/products/airforce-shell.jpg.asset.json";
import imgNiteball from "@/assets/products/adidas-niteball.jpg.asset.json";
import imgShoxTl from "@/assets/products/nike-shox-tl.jpg.asset.json";
import imgCustomisedAirforce from "@/assets/products/customised-airforce.jpg.asset.json";
import imgAf1PortalBundle from "@/assets/products/af1-portal-bundle.jpg.asset.json";
import imgIphoneXr from "@/assets/products/iphone-xr.jpg.asset.json";
import imgIphone11 from "@/assets/products/iphone-11-64gb.jpg.asset.json";
import imgIphone13 from "@/assets/products/iphone-13-128gb.jpg.asset.json";
import imgIphone15 from "@/assets/products/iphone-15-256gb.jpg.asset.json";
import imgIphone16 from "@/assets/products/iphone-16-256gb.jpg.asset.json";

/** Real catalogue photos supplied by the owner, keyed by product id. */
const PRODUCT_IMAGES: Record<string, string> = {
  "nike-air-max-95": imgAirMax95.url,
  "nike-sb-dunk": imgSbDunk.url,
  "adidas-campus-x-bad-bunny": imgCampusBadBunny.url,
  "timberland-x-nike-tn-combo": imgTnCombo.url,
  "nike-portal": imgPortal.url,
  "nike-tn": imgTn.url,
  "puma-mayze": imgMayze.url,
  "new-balance-550": imgNb550.url,
  "vans-old-skool-checkerboard": imgVansCheckerboard.url,
  "nike-furyosa": imgFuryosa.url,
  "air-jordan-1-high": imgJordan1High.url,
  "airforce-shell": imgAirforceShell.url,
  "adidas-niteball": imgNiteball.url,
  "nike-shox-tl": imgShoxTl.url,
  "customised-airforce": imgCustomisedAirforce.url,
  "af1-nike-portal-bundle": imgAf1PortalBundle.url,
  "iphone-xr-64gb": imgIphoneXr.url,
  "iphone-11-64gb": imgIphone11.url,
  "iphone-13-128gb": imgIphone13.url,
  "iphone-15-128gb": imgIphone15.url,
  "iphone-16": imgIphone16.url,
};

export type Category = "iphones" | "sneakers";
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
  ["Nike Air Max 95", 1400, range(1, 10)],
  ["Nike SB Dunk", 1300, range(1, 10)],
  ["Adidas Campus x Bad Bunny", 1400, range(1, 10)],
  ["Timberland x Nike TN Combo", 2600, range(1, 10)],
  ["Nike Portal", 1400, range(1, 10)],
  ["Nike TN", 1400, range(1, 10)],
  ["Puma Mayze", 1200, range(1, 10)],
  ["New Balance 550", 1400, range(1, 10)],
  ["Vans Old Skool Checkerboard", 1300, range(1, 10)],
  ["Nike Furyosa", 1400, range(1, 10)],
  ["Air Jordan 1 High", 1400, range(1, 10)],
  ["Airforce Shell", 1400, range(1, 10)],
  ["Adidas Niteball", 1500, range(1, 10)],
  ["Nike Shox TL", 1400, range(1, 10)],
  ["Customised Airforce", 1300, range(1, 10)],
  ["AF1 + Nike Portal Bundle", 3500, range(1, 10), "Listing mentions free delivery — owner to confirm before this is published."],
];

const FEATURED = new Set([
  "iphone-16-pro-max-256gb", "iphone-15-pro-128gb", "iphone-13-128gb",
  "nike-sb-dunk", "new-balance-550", "air-jordan-1-high",
]);

export const products: Product[] = [
  ...iphones.map(([name, storage, price]) => {
    const id = slug(`${name} ${storage ?? ""}`);
    return {
      id, name, storage, price, category: "iphones" as const, availability: "confirm" as const,
      featured: FEATURED.has(id), image: PRODUCT_IMAGES[id],
      ownerNote: storage ? undefined : "Storage capacity not supplied — owner to confirm.",
    };
  }),
  ...sneakers.map(([name, price, listedSizes, ownerNote]) => {
    const id = slug(name);
    return {
      id, name, price, listedSizes, ownerNote, category: "sneakers" as const,
      availability: "confirm" as const, featured: FEATURED.has(id), image: PRODUCT_IMAGES[id],
    };
  }),
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (p: number | null) =>
  p == null ? "Price on enquiry" : "R" + p.toLocaleString("en-ZA").replace(/\s|\u00a0/g, ",");
