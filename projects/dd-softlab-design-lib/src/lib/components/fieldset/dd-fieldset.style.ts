import { toCssVar } from "../../theming/theme-tokens";

export const DD_FIELDSET_CSS = `
.dd-fieldset {
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  padding: ${toCssVar("space.md")} ${toCssVar("space.md")};
  margin: 0;
}

.dd-fieldset__legend {
  padding: 0 ${toCssVar("space.xs")};
  font-weight: 600;
  font-size: 0.875rem;
  color: ${toCssVar("color.text")};
}

.dd-fieldset--disabled {
  opacity: 0.6;
  pointer-events: none;
}
`;
