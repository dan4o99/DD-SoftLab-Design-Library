import { toCssVar } from "../../theming/theme-tokens";

export const DD_TREE_VIEW_CSS = `
.dd-tree-view {
  display: block;
}

.dd-tree-view__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dd-tree-view__list--nested {
  padding-left: 1.5rem;
}

.dd-tree-view__item {
  display: flex;
  flex-direction: column;
}

.dd-tree-view__row {
  display: flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border-radius: ${toCssVar("radius.sm")};
  cursor: pointer;
  user-select: none;
  color: ${toCssVar("color.text")};
  transition: background 120ms;
}

.dd-tree-view__row:hover {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-tree-view__row--selected {
  background: ${toCssVar("color.surfaceAlt")};
  font-weight: 500;
  color: ${toCssVar("color.primary")};
}

.dd-tree-view__row:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 1px;
}

.dd-tree-view__toggle {
  display: inline-block;
  width: 1rem;
  text-align: center;
  font-size: 0.7rem;
  color: ${toCssVar("color.textMuted")};
  flex-shrink: 0;
  transition: transform 200ms;
}

.dd-tree-view__toggle--expanded {
  transform: rotate(90deg);
}

.dd-tree-view__icon {
  flex-shrink: 0;
  color: ${toCssVar("color.textMuted")};
}

.dd-tree-view__label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;
