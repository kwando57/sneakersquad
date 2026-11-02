import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { EnquiryProvider, useEnquiry } from "@/components/enquiry";
import { getProduct } from "@/data/products";

function AddSameTwice() {
  const { add } = useEnquiry();
  return (
    <button onClick={() => { add("nike-sb-dunk", "7"); add("nike-sb-dunk", "7"); }}>
      add twice
    </button>
  );
}

describe("Enquiry list", () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("allows the same product to be added more than once", async () => {
    render(
      <EnquiryProvider>
        <AddSameTwice />
      </EnquiryProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "add twice" }));

    // Open the drawer via the toast's "View list" link.
    fireEvent.click(screen.getByRole("button", { name: "View list" }));

    const sbDunk = getProduct("nike-sb-dunk")!;
    const entries = screen.getAllByText(new RegExp(`^${sbDunk.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    expect(entries).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: `Remove ${sbDunk.name}` })).toHaveLength(2);
  });

  it("keeps same-product entries with different sizes separate", async () => {
    render(
      <EnquiryProvider>
        <AddDifferentSizes />
      </EnquiryProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "add two sizes" }));
    fireEvent.click(screen.getByRole("button", { name: "View list" }));

    const am95 = getProduct("nike-air-max-95")!;
    expect(screen.getAllByRole("button", { name: `Remove ${am95.name}` })).toHaveLength(2);
    const selects = screen.getAllByRole("combobox", { name: `Size for ${am95.name}` }) as HTMLSelectElement[];
    expect(selects.map((s) => s.value)).toEqual(["5", "8"]);
  });

  it("changing one entry's size leaves the duplicate unchanged", () => {
    render(
      <EnquiryProvider>
        <AddDifferentSizes />
      </EnquiryProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "add two sizes" }));
    fireEvent.click(screen.getByRole("button", { name: "View list" }));
    const am95 = getProduct("nike-air-max-95")!;
    const selects = () => screen.getAllByRole("combobox", { name: `Size for ${am95.name}` }) as HTMLSelectElement[];
    fireEvent.change(selects()[0]!, { target: { value: "10" } });
    expect(selects().map((s) => s.value)).toEqual(["10", "8"]);
  });
});

function AddDifferentSizes() {
  const { add } = useEnquiry();
  return (
    <button onClick={() => { add("nike-air-max-95", "5"); add("nike-air-max-95", "8"); }}>
      add two sizes
    </button>
  );
}
