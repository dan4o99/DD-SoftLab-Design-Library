import { toCssVar } from "../../theming/theme-tokens";

export const DD_CONTEXT_MENU_CSS = `
.dd-context-menu {
  position: relative;
  display: inline-block;
}

.dd-context-menu__panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 900;
  min-width: 12rem;
  background: ${toCssVar("color.surface")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  box-shadow: ${toCssVar("shadow.md")};
  padding: 4px;
  animation: dd-context-menu-in 120ms ease-out;
}

.dd-context-menu__panel--right {
  left: auto;
  right: 0;
}

@keyframes dd-context-menu-in {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: none; }
}

.dd-context-menu__item {
  display: flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  width: 100%;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border: none;
  border-radius: calc(${toCssVar("radius.md")} - 2px);
  background: none;
  color: ${toCssVar("color.text")};
  font: inherit;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
  transition: background 100ms;
  white-space: nowrap;
}

.dd-context-menu__item:hover:not(:disabled) {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-context-menu__item:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 1px;
}

.dd-context-menu__item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dd-context-menu__item--danger {
  color: ${toCssVar("color.danger")};
}

.dd-context-menu__separator {
  height: 1px;
  background: ${toCssVar("color.border")};
  margin: 4px 0;
}
`;
