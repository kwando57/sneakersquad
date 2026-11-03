import type { Product } from "@/data/products";

/** Every entry counts once, including duplicates; unpriced items never become free. */
export function enquiryTotal(items: { product: Pick<Product, "price"> }[]) {
  return items.reduce((summary, { product }) => ({
    amount: summary.amount + (product.price ?? 0),
    unpriced: summary.unpriced + (product.price == null ? 1 : 0),
  }), { amount: 0, unpriced: 0 });
}