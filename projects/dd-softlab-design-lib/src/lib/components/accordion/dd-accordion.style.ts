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
  display: none;
  padding: ${toCssVar("space.md")};
  border-top: 1px solid ${toCssVar("color.border")};
}

.dd-accordion__content--open {
  display: block;
}
`;
