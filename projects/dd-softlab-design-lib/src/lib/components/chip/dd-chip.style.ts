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

.dd-chip--removable {
  gap: 0;
  padding: 0;
  overflow: hidden;
}

.dd-chip__action,
.dd-chip__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  border: none;
  background: none;
  color: inherit;
  font: inherit;
}

.dd-chip__action {
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  cursor: pointer;
}

.dd-chip__remove {
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border-left: 1px solid ${toCssVar("color.border")};
  cursor: pointer;
}

.dd-chip:hover {
  filter: brightness(0.97);
}

.dd-chip__action:hover,
.dd-chip__remove:hover {
  background: color-mix(in srgb, ${toCssVar("color.text")} 4%, transparent);
}

.dd-chip__action:focus-visible,
.dd-chip__remove:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: -2px;
}

.dd-chip:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dd-chip__action:disabled,
.dd-chip__remove:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
