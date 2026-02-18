import { toCssVar } from "../../theming/theme-tokens";

export const DD_SWITCH_CSS = `
.dd-switch {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.sm")};
  color: ${toCssVar("color.text")};
}

.dd-switch__button {
  position: relative;
  width: 2.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 999px;
  background: ${toCssVar("color.border")};
  cursor: pointer;
  transition: background 120ms ease-in-out;
}

.dd-switch__button::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999px;
  background: ${toCssVar("color.surface")};
  transition: transform 120ms ease-in-out;
}

.dd-switch__label {
  cursor: pointer;
  user-select: none;
}

.dd-switch--checked .dd-switch__button {
  background: ${toCssVar("color.primary")};
}

.dd-switch--checked .dd-switch__button::after {
  transform: translateX(1rem);
}

.dd-switch--disabled {
  opacity: 0.6;
}

.dd-switch--disabled .dd-switch__button {
  cursor: not-allowed;
}
`;
