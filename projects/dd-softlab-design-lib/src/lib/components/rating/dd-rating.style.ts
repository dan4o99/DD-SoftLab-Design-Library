import { toCssVar } from "../../theming/theme-tokens";

export const DD_RATING_CSS = `
.dd-rating {
  display: inline-flex;
  gap: 2px;
  align-items: center;
}

.dd-rating__star {
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  color: ${toCssVar("color.border")};
  transition: color 120ms, transform 120ms;
}

.dd-rating__star--filled {
  color: #f59e0b;
}

.dd-rating__star--hovered {
  color: #fbbf24;
}

.dd-rating__star:hover {
  transform: scale(1.15);
}

.dd-rating__star:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  border-radius: ${toCssVar("radius.sm")};
  outline-offset: 2px;
}

.dd-rating--readonly .dd-rating__star {
  cursor: default;
  pointer-events: none;
}
`;
