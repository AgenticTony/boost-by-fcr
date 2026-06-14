import { useState } from "react";
import { ImageIcon } from "lucide-react";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

/**
 * Inner component that manages error state — re-mounted when src changes
 * via the key prop, which resets the error state automatically.
 */
function ImageWithFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-muted/40 text-text-muted/30"
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="h-10 w-10" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setError(true)}
    />
  );
}

export function ResilientImage({
  src,
  alt,
  className,
  fallbackClassName,
}: Props) {
  if (!src) {
    return (
      <div
        className={
          fallbackClassName ??
          "flex items-center justify-center bg-muted/40 text-text-muted/30"
        }
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="h-10 w-10" />
      </div>
    );
  }

  return (
    <ImageWithFallback key={src} src={src} alt={alt} className={className} />
  );
}
