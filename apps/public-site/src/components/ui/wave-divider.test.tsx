import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { WaveDivider } from "./wave-divider";

/**
 * The bug these guard against: the divider used to take a single colour, and
 * which side it landed on depended on a `flip` flag. Every in-section divider
 * ended up painting #FFFFFF above the wave while the section above was
 * #FAF8F5, leaving a white band and a hard horizontal line.
 */
function setup(ui: React.ReactElement) {
  const { container } = render(ui);
  const wrapper = container.firstElementChild as HTMLElement;
  const svg = wrapper.querySelector("svg")!;
  const paths = [...svg.querySelectorAll("path")];
  return { wrapper, svg, paths };
}

describe("WaveDivider", () => {
  it("paints `from` above the wave and `to` below it", () => {
    const { wrapper, paths } = setup(<WaveDivider from="surface" to="navy" />);

    // Everything above the crest is the container background.
    expect(wrapper.style.background).toBe("rgb(250, 248, 245)");
    // Every filled path is the colour of the section below.
    paths.forEach((p) => expect(p.getAttribute("fill")).toBe("#072D59"));
  });

  it("resolves raw hex values as well as token names", () => {
    const { wrapper, paths } = setup(
      <WaveDivider from="#123456" to="#abcdef" />,
    );

    expect(wrapper.style.background).toBe("rgb(18, 52, 86)");
    expect(paths[paths.length - 1].getAttribute("fill")).toBe("#abcdef");
  });

  it("mirror changes only the shape, never which side is filled", () => {
    const plain = setup(<WaveDivider from="navy" to="white" />);
    const mirrored = setup(<WaveDivider from="navy" to="white" mirror />);

    expect(mirrored.wrapper.style.background).toBe(
      plain.wrapper.style.background,
    );
    expect(mirrored.paths.at(-1)!.getAttribute("fill")).toBe(
      plain.paths.at(-1)!.getAttribute("fill"),
    );
    expect(mirrored.svg.getAttribute("class")).toContain("-scale-x-100");
    expect(plain.svg.getAttribute("class")).not.toContain("-scale-x-100");
  });

  it("draws the echo wave behind the crest, and can omit it", () => {
    expect(setup(<WaveDivider from="navy" to="white" />).paths).toHaveLength(2);
    expect(
      setup(<WaveDivider from="navy" to="white" layered={false} />).paths,
    ).toHaveLength(1);
  });

  it("is hidden from assistive tech", () => {
    const { wrapper } = setup(<WaveDivider from="navy" to="white" />);
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
  });
});
