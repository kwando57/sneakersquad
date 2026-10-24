import { useState } from "react";
import { ImageIcon } from "lucide-react";

/** Shared by catalogue, featured items and category tiles; never crops a product. */
export function ProductImage({ src, alt }: { src?: string | undefined; alt: string }) {
  const [failedSrc, setFailedSrc] = useState<string>();

  if (src && src !== failedSrc) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="size-full object-contain p-3"
        onError={() => setFailedSrc(src)}
      />
    );
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-secondary p-4 text-center">
      <ImageIcon className="size-8 text-primary/70" strokeWidth={1.4} aria-hidden="true" />
      <span className="text-xs leading-relaxed text-muted-foreground">Product image coming soon</span>
    </div>
  );
}