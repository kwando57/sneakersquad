import { formatPrice, type Product } from "@/data/products";

export const WHATSAPP_DISPLAY = "+27 68 211 5106";
export const WHATSAPP_NUMBER = "27682115106";

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const generalMessage = "Hi Sneaker Squad, I would like to enquire about your products.";

const describe = (p: Product, size?: string) => {
  const parts = [p.name];
  if (p.storage) parts.push(p.storage);
  if (size) parts.push(`size ${size}`);
  return parts.join(" — ");
};

export const productMessage = (p: Product, size?: string) =>
  `Hi Sneaker Squad, I am interested in ${describe(p, size)} (listed at ${formatPrice(p.price)}). Please confirm the current price, availability and delivery options.`;

export const listMessage = (items: { product: Product; size?: string }[]) =>
  [
    "Hi Sneaker Squad, I am interested in the following items:",
    ...items.map((it, i) => `${i + 1}. ${describe(it.product, it.size)} (listed at ${formatPrice(it.product.price)})`),
    "",
    "Please confirm the current prices, availability and delivery options.",
  ].join("\n");
