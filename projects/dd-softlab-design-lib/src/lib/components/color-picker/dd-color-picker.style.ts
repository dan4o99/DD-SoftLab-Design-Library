import { toCssVar } from "../../theming/theme-tokens";

export const DD_COLOR_PICKER_CSS = `
.dd-color-picker {
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.sm")};
  width: 100%;
}

.dd-color-picker__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${toCssVar("color.text")};
  margin-bottom: ${toCssVar("space.xs")};
}

.dd-color-picker__input-wrapper {
  display: flex;
  align-items: center;
  gap: ${toCssVar("space.sm")};
}

.dd-color-picker__input {
  width: 3rem;
  height: 2rem;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  cursor: pointer;
  padding: 0.25rem;
}

.dd-color-picker__input:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-color-picker__text-input {
  flex: 1 1 auto;
  min-width: 0;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  font: inherit;
  font-family: monospace;
}

.dd-color-picker__text-input:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
  border-color: ${toCssVar("color.primary")};
}

.dd-color-picker__text-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
