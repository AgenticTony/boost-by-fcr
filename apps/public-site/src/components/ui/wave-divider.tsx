/**
 * SVG wave divider — used between full-width sections.
 * Set `layered` for a dual-wave effect and `flip` to rotate 180°.
 */
export function WaveDivider({
  flip = false,
  color = "white",
  layered = false,
}: {
  flip?: boolean;
  color?: "white" | "navy" | string;
  layered?: boolean;
}) {
  const fill =
    color === "navy" ? "#072D59" : color === "white" ? "#FFFFFF" : color;
  return (
    <div
      className={`w-full leading-[0] ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {layered && (
          <path
            d="M0 35C200 70 400 10 720 35C1040 60 1240 5 1440 35V80H0V35Z"
            fill={fill}
            opacity="0.3"
          />
        )}
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
