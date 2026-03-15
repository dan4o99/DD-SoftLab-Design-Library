import { toCssVar } from "../../theming/theme-tokens";

export const DD_ACCORDION_CSS = `
.dd-accordion {
  display: block;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  overflow: hidden;
}

.dd-accordion__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${toCssVar("space.sm")};
  border: none;
  background: ${toCssVar("color.surfaceAlt")};
  color: inherit;
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.dd-accordion__header:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dd-accordion__arrow {
  display: inline-flex;
  transition: transform 120ms ease-in-out;
}

.dd-accordion__arrow--open {
  transform: rotate(180deg);
}

.dd-accordion__content {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  border-top: 1px solid transparent;
  pointer-events: none;
  will-change: grid-template-rows, opacity;
  transition:
    grid-template-rows 220ms ease,
    opacity 180ms ease,
    border-color 220ms ease;
}

.dd-accordion__content-inner {
  overflow: hidden;
  padding: 0;
  transition: padding 220ms ease;
}

.dd-accordion__content--open {
  grid-template-rows: 1fr;
  opacity: 1;
  border-top-color: ${toCssVar("color.border")};
  pointer-events: auto;
}

.dd-accordion__content--open .dd-accordion__content-inner {
  padding: ${toCssVar("space.md")};
}
`;
