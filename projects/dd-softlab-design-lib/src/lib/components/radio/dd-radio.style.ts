import { toCssVar } from "../../theming/theme-tokens";

export const DD_RADIO_CSS = `
.dd-radio {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.sm")};
  color: ${toCssVar("color.text")};
  cursor: pointer;
}

.dd-radio input[type="radio"] {
  width: 1rem;
  height: 1rem;
  accent-color: ${toCssVar("color.primary")};
}

.dd-radio--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
