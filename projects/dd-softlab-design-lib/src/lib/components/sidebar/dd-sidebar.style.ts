import { toCssVar } from "../../theming/theme-tokens";

export const DD_SIDEBAR_CSS = `
.dd-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.md")};
  width: 18rem;
  min-height: 100%;
  padding: ${toCssVar("space.md")};
  border-right: 1px solid ${toCssVar("color.border")};
  background: ${toCssVar("color.surfaceAlt")};
  color: ${toCssVar("color.text")};
  height: 100%;
}

.dd-sidebar__header {
  display: block;
}

.dd-sidebar__header :not(:has(>*)) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dd-sidebar__footer {
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
}

.dd-sidebar__collapse-icon {
  width: 2rem;
  height: 2rem;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: 999px;
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  font: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.dd-sidebar__collapse-icon:hover {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-sidebar__content {
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.xs")};
  min-height: 0;
  flex: 1 1 auto;
  overflow-y: auto;
}

.dd-sidebar__resizer {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  width: 1rem;
  height: 1rem;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: 999px;
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ew-resize;
  padding: 0;
  z-index: 1;
}

.dd-sidebar__resizer:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-sidebar__resizer-handle {
  font-size: 0.65rem;
  letter-spacing: -1px;
}

`;
