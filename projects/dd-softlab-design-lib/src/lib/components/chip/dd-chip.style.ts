import { toCssVar } from "../../theming/theme-tokens";

export const DD_CHIP_CSS = `
.dd-chip {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: 999px;
  background: ${toCssVar("color.surfaceAlt")};
  color: ${toCssVar("color.text")};
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  font: inherit;
  cursor: pointer;
  transition: filter 120ms ease-in-out;
}

.dd-chip:hover {
  filter: brightness(0.97);
}

.dd-chip:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
