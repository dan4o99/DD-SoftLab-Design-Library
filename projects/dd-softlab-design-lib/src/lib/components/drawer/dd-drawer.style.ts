import { toCssVar } from "../../theming/theme-tokens";

export type DdDrawerPlacement = "left" | "right" | "top" | "bottom";

export const DD_DRAWER_CSS = `
.dd-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(0, 0, 0, 0.4);
  animation: dd-drawer-fade 200ms ease-out;
}

.dd-drawer {
  position: fixed;
  z-index: 901;
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  box-shadow: ${toCssVar("shadow.md")};
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dd-drawer--left {
  top: 0; left: 0; bottom: 0;
  width: 320px;
  max-width: 90vw;
  animation: dd-drawer-slide-right 250ms ease-out;
}

.dd-drawer--right {
  top: 0; right: 0; bottom: 0;
  width: 320px;
  max-width: 90vw;
  animation: dd-drawer-slide-left 250ms ease-out;
}

.dd-drawer--top {
  top: 0; left: 0; right: 0;
  max-height: 50vh;
  animation: dd-drawer-slide-down 250ms ease-out;
}

.dd-drawer--bottom {
  bottom: 0; left: 0; right: 0;
  max-height: 50vh;
  animation: dd-drawer-slide-up 250ms ease-out;
}

.dd-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${toCssVar("space.md")} ${toCssVar("space.lg")};
  border-bottom: 1px solid ${toCssVar("color.border")};
  flex-shrink: 0;
}

.dd-drawer__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.dd-drawer__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  color: ${toCssVar("color.text")};
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  line-height: 1;
  transition: background 120ms;
}

.dd-drawer__close:hover {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-drawer__close:focus-visible {
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: ${toCssVar("space.lg")};
}

@keyframes dd-drawer-fade {
  from { opacity: 0; } to { opacity: 1; }
}
@keyframes dd-drawer-slide-right {
  from { transform: translateX(-100%); } to { transform: translateX(0); }
}
@keyframes dd-drawer-slide-left {
  from { transform: translateX(100%); } to { transform: translateX(0); }
}
@keyframes dd-drawer-slide-down {
  from { transform: translateY(-100%); } to { transform: translateY(0); }
}
@keyframes dd-drawer-slide-up {
  from { transform: translateY(100%); } to { transform: translateY(0); }
}
`;
