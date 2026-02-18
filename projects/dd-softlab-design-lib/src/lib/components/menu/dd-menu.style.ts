import { toCssVar } from "../../theming/theme-tokens";

export const DD_MENU_CSS = `
.dd-menu {
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.xs")};
  padding: ${toCssVar("space.xs")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
}

.dd-menu--horizontal {
  flex-direction: row;
  align-items: center;
}

.dd-menu :where(a, button, .dd-menu__item) {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  width: 100%;
  min-height: 2.5rem;
  border: none;
  border-radius: ${toCssVar("radius.sm")};
  background: transparent;
  color: inherit;
  text-decoration: none;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.dd-menu :where(a, button, .dd-menu__item):hover {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-menu :where(a, button, .dd-menu__item):focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 1px;
}
`;
