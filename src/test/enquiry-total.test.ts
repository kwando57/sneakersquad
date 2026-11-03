import { describe, expect, it } from "vitest";
import { enquiryTotal } from "@/lib/enquiry-total";
import { getProduct } from "@/data/products";
import { listMessage } from "@/lib/whatsapp";

describe("Enquiry totals", () => {
  it("counts every duplicate entry at its listed price", () => {
    expect(enquiryTotal([{ product: { price: 1300 } }, { product: { price: 1300 } }])).toEqual({ amount: 2600, unpriced: 0 });
  });
  it("updates the total when an entry is removed", () => {
    const items = [{ product: { price: 1300 } }, { product: { price: 1400 } }];
    expect(enquiryTotal(items.slice(1)).amount).toBe(1400);
  });
  it("distinguishes missing prices from the priced subtotal", () => {
    expect(enquiryTotal([{ product: { price: null } }, { product: { price: 1300 } }])).toEqual({ amount: 1300, unpriced: 1 });
  });
  it("returns zero for an empty enquiry", () => {
    expect(enquiryTotal([])).toEqual({ amount: 0, unpriced: 0 });
  });
  it("includes duplicate prices in the WhatsApp total", () => {
    const product = getProduct("nike-sb-dunk");
    if (!product) throw new Error("Missing catalogue product");
    expect(listMessage([{ product, size: "5" }, { product, size: "8" }])).toContain("Listed items total: R2,600");
  });
});