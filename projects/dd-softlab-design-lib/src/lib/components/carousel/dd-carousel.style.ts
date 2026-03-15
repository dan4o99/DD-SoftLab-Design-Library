import { toCssVar } from "../../theming/theme-tokens";

export const DD_CAROUSEL_CSS = `
.dd-carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.dd-carousel__track {
  display: flex;
  transition: transform 350ms ease-in-out;
}

.dd-carousel__slide {
  flex: 0 0 100%;
  width: 100%;
}

.dd-carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${toCssVar("space.sm")};
  margin-top: ${toCssVar("space.sm")};
}

.dd-carousel__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  cursor: pointer;
  font-size: 1.125rem;
  transition: background 120ms;
}

.dd-carousel__btn:hover:not(:disabled) {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-carousel__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dd-carousel__btn:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-carousel__dots {
  display: flex;
  gap: ${toCssVar("space.xs")};
  align-items: center;
}

.dd-carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${toCssVar("color.border")};
  cursor: pointer;
  padding: 0;
  transition: background 150ms;
}

.dd-carousel__dot--active {
  background: ${toCssVar("color.primary")};
}

.dd-carousel__dot:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}
`;
