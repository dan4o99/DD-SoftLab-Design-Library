import { toCssVar } from "../../theming/theme-tokens";

export const DD_MENU_ITEM_CSS = `
.dd-menu-item {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  width: 100%;
  min-width: 0;
  min-height: 2.5rem;
  border: none;
  border-radius: ${toCssVar("radius.sm")};
  background: transparent;
  color: ${toCssVar("color.text")};
  text-decoration: none;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.dd-menu-item:hover {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-menu-item--active {
  background: ${toCssVar("color.surfaceAlt")};
  color: ${toCssVar("color.primary")};
  font-weight: 600;
}

.dd-menu-item:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 1px;
}

.dd-menu-item:disabled,
.dd-menu-item--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.dd-menu-item__label {
  display: block;
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;
