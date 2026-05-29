import { useState } from "react";
import { ImageIcon } from "lucide-react";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackClassName?: string;
};

export function ResilientImage({
  src,
  alt,
  className,
  fallbackClassName,
}: Props) {
  const [error, setError] = useState(false);

  if (!src || error) {
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
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}
