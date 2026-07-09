/**
 * SVG wave divider — used between full-width sections.
 * Set `layered` for a dual-wave effect and `flip` to rotate 180°.
 * `bg` sets the container's background so transparent areas of the SVG match
 * the section below (defaults to transparent, which shows the body bg).
 */
export function WaveDivider({
  flip = false,
  color = "white",
  layered = false,
  bg,
}: {
  flip?: boolean;
  color?: "white" | "navy" | string;
  layered?: boolean;
  bg?: "white" | "navy" | "surface" | string;
}) {
  const fill =
    color === "navy" ? "#072D59" : color === "white" ? "#FFFFFF" : color;
  const bgColor =
    bg === "navy" ? "#072D59"
    : bg === "white" ? "#FFFFFF"
    : bg === "surface" ? "#FAF8F5"
    : bg;
  return (
    <div
      className={`w-full leading-[0] ${flip ? "rotate-180" : ""}`}
      style={bgColor ? { background: bgColor } : undefined}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {layered && (
          <path
            d="M0 22C200 44 400 6 720 22C1040 38 1240 3 1440 22V50H0V22Z"
            fill={fill}
            opacity="0.3"
          />
        )}
        <path
          d="M0 25C240 50 480 0 720 25C960 50 1200 0 1440 25V50H0V25Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
