import { toCssVar } from "../../theming/theme-tokens";

export const DD_SELECT_CSS = `
.dd-select {
  display: block;
  width: 100%;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  font: inherit;
  line-height: 1.25;
  transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out;
}

.dd-select:focus {
  border-color: ${toCssVar("color.primary")};
  box-shadow: 0 0 0 3px color-mix(in srgb, ${toCssVar("color.primary")} 20%, transparent);
  outline: none;
}

.dd-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
