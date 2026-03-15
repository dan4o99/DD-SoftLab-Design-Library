import { toCssVar } from "../../theming/theme-tokens";

export const DD_PAGINATION_CSS = `
.dd-pagination {
  display: flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  list-style: none;
  margin: 0;
  padding: 0;
}

.dd-pagination__item {
  display: inline-flex;
}

.dd-pagination__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 ${toCssVar("space.xs")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 120ms, border-color 120ms;
}

.dd-pagination__btn:hover:not(:disabled) {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-pagination__btn:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-pagination__btn--active {
  background: ${toCssVar("color.primary")};
  color: ${toCssVar("color.primaryContrast")};
  border-color: ${toCssVar("color.primary")};
}

.dd-pagination__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dd-pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  font-size: 0.875rem;
  color: ${toCssVar("color.textMuted")};
  user-select: none;
}
`;
