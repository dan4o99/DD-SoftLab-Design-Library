import { toCssVar } from "../../theming/theme-tokens";

export const DD_CHECKBOX_CSS = `
.dd-checkbox {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.sm")};
  color: ${toCssVar("color.text")};
  cursor: pointer;
}

.dd-checkbox input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  accent-color: ${toCssVar("color.primary")};
}

.dd-checkbox--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
