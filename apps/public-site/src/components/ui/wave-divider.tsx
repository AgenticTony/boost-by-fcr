/**
 * Wave divider between two full-width sections.
 *
 * A divider is a transition between TWO colours, so it takes both. `from` is
 * the colour above the wave, `to` is the colour below it - always, regardless
 * of where the component sits or which way the wave bows:
 *
 *     <WaveDivider from="surface" to="navy" />   // light section -> navy section
 *     <WaveDivider from="navy" to="white" />     // navy section -> white section
 *
 * The previous API took a single `color` and an optional `bg`, and which side
 * the fill landed on depended on a `flip` flag. That made it easy to get
 * backwards, and it was: every in-section divider on the site painted #FFFFFF
 * above the wave while the section above was #FAF8F5, leaving a visible band
 * and a hard horizontal line. Stating both colours makes that mistake
 * impossible - if `from` matches the section above, there is nothing to see.
 *
 * `mirror` flips the wave horizontally for visual variety. It only changes the
 * shape, never which side is filled, so it cannot reintroduce a seam.
 */

const TOKENS: Record<string, string> = {
  navy: "#072D59",
  white: "#FFFFFF",
  surface: "#FAF8F5",
};

const resolve = (c: string) => TOKENS[c] ?? c;

/**
 * Asymmetric crests, deliberately not a repeating sine.
 * The old path was two identical mirrored periods, which read as a generated
 * wave rather than a drawn one. These crests differ in width and height so the
 * curve never visibly repeats across the full width.
 */
const CREST =
  "M0 34C130 21 268 16 404 27C540 38 636 55 782 53C928 51 1046 31 1188 26C1288 22 1372 30 1440 35V64H0V34Z";

/** Same curve lifted ~7 units, so it peeks above the main one as a soft echo. */
const CREST_ECHO =
  "M0 27C140 15 280 11 420 22C560 33 650 50 800 48C950 46 1064 26 1204 21C1300 18 1378 26 1440 30V64H0V27Z";

export function WaveDivider({
  from,
  to,
  layered = true,
  mirror = false,
}: {
  /** Colour above the wave - match the section immediately above. */
  from: "navy" | "white" | "surface" | (string & {});
  /** Colour below the wave - match the section immediately below. */
  to: "navy" | "white" | "surface" | (string & {});
  /** Draw the softer echo wave behind the main crest. */
  layered?: boolean;
  /** Mirror horizontally. Shape only - never affects which side is filled. */
  mirror?: boolean;
}) {
  const fill = resolve(to);

  return (
    <div
      // -mb-px pulls the next section up by 1px. preserveAspectRatio="none"
      // with h-auto gives the SVG a fractional height (1280 x 64/1440 = 56.9px),
      // so its last row is antialiased and the container colour bleeds through
      // as a hairline against the section below. Overlapping by a pixel hides
      // it. The top edge needs no such trick: the container background is
      // `from`, which already matches the section above.
      className="w-full leading-[0] -mb-px"
      style={{ background: resolve(from) }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        // `block` matters: an inline SVG sits on the text baseline and leaves a
        // sub-pixel gap under it, which shows up as a hairline between sections.
        className={`block w-full h-auto ${mirror ? "-scale-x-100" : ""}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        {layered && <path d={CREST_ECHO} fill={fill} opacity="0.22" />}
        <path d={CREST} fill={fill} />
      </svg>
    </div>
  );
}
