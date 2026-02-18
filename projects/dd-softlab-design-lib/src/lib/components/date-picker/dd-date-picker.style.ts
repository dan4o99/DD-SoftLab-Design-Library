import { toCssVar } from "../../theming/theme-tokens";

export const DD_DATE_PICKER_CSS = `
.dd-date-picker {
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.sm")};
  width: 100%;
}

.dd-date-picker__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${toCssVar("color.text")};
  margin-bottom: ${toCssVar("space.xs")};
}

.dd-date-picker__input {
  width: 100%;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  font: inherit;
}

.dd-date-picker__input:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
  border-color: ${toCssVar("color.primary")};
}

.dd-date-picker__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dd-date-picker__input::placeholder {
  color: ${toCssVar("color.textAlt")};
}
`;
