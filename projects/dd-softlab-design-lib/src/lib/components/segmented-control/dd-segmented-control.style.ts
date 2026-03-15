import { toCssVar } from "../../theming/theme-tokens";

export const DD_SEGMENTED_CONTROL_CSS = `
.dd-segmented-control {
  display: inline-flex;
  background: ${toCssVar("color.surfaceAlt")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  padding: 3px;
  gap: 2px;
}

.dd-segmented-control__option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border-radius: calc(${toCssVar("radius.md")} - 2px);
  border: none;
  background: none;
  color: ${toCssVar("color.textMuted")};
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 150ms, color 150ms;
  white-space: nowrap;
}

.dd-segmented-control__option:hover:not(:disabled) {
  color: ${toCssVar("color.text")};
}

.dd-segmented-control__option--active {
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

.dd-segmented-control__option:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-segmented-control__option:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`;
