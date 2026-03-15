import { toCssVar } from "../../theming/theme-tokens";

export const DD_SLIDER_CSS = `
.dd-slider {
  display: block;
  padding: ${toCssVar("space.xs")} 0;
}

.dd-slider__input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: ${toCssVar("color.border")};
  outline: none;
  cursor: pointer;
}

.dd-slider__input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background: ${toCssVar("color.primary")};
  border: 2px solid ${toCssVar("color.surface")};
  box-shadow: 0 0 0 2px ${toCssVar("color.primary")};
  cursor: pointer;
  transition: box-shadow 150ms;
}

.dd-slider__input::-moz-range-thumb {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  background: ${toCssVar("color.primary")};
  border: 2px solid ${toCssVar("color.surface")};
  box-shadow: 0 0 0 2px ${toCssVar("color.primary")};
  cursor: pointer;
}

.dd-slider__input:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 4px ${toCssVar("color.primary")};
}

.dd-slider__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dd-slider__labels {
  display: flex;
  justify-content: space-between;
  margin-top: ${toCssVar("space.xs")};
  font-size: 0.75rem;
  color: ${toCssVar("color.textMuted")};
}
`;
