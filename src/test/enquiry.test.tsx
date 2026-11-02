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

    await userEvent.click(screen.getByRole("button", { name: "add twice" }));

    // Open the drawer via the toast's "View list" link.
    await userEvent.click(screen.getByRole("button", { name: "View list" }));

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

    await userEvent.click(screen.getByRole("button", { name: "add two sizes" }));
    await userEvent.click(screen.getByRole("button", { name: "View list" }));

    const am95 = getProduct("nike-air-max-95")!;
    expect(screen.getAllByRole("button", { name: `Remove ${am95.name}` })).toHaveLength(2);
    expect(screen.getByText("Size 5")).toBeTruthy();
    expect(screen.getByText("Size 8")).toBeTruthy();
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
