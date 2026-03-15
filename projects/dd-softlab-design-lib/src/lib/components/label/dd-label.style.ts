import { toCssVar } from "../../theming/theme-tokens";

export const DD_LABEL_CSS = `
.dd-label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${toCssVar("color.text")};
  margin-bottom: ${toCssVar("space.xs")};
}

.dd-label--required::after {
  content: " *";
  color: ${toCssVar("color.danger")};
}

.dd-label--disabled {
  opacity: 0.6;
}
`;
