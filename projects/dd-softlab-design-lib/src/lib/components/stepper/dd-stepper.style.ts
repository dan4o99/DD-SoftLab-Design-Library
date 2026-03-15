import { toCssVar } from "../../theming/theme-tokens";

export const DD_STEPPER_CSS = `
.dd-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  overflow: hidden;
}

.dd-stepper__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  background: ${toCssVar("color.surfaceAlt")};
  border: none;
  color: ${toCssVar("color.text")};
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: background 120ms;
}

.dd-stepper__btn:hover:not(:disabled) {
  background: ${toCssVar("color.border")};
}

.dd-stepper__btn:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: -2px;
}

.dd-stepper__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dd-stepper__value {
  min-width: 3rem;
  text-align: center;
  padding: 0 ${toCssVar("space.xs")};
  font: inherit;
  font-size: 1rem;
  color: ${toCssVar("color.text")};
  border: none;
  border-left: 1px solid ${toCssVar("color.border")};
  border-right: 1px solid ${toCssVar("color.border")};
  background: ${toCssVar("color.surface")};
  height: 2.25rem;
  box-sizing: border-box;
  outline: none;
}

.dd-stepper__value:focus {
  background: ${toCssVar("color.surfaceAlt")};
}
`;
