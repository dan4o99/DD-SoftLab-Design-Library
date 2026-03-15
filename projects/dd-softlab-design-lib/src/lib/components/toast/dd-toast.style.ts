import { toCssVar } from "../../theming/theme-tokens";

export const DD_TOAST_CSS = `
.dd-toast-container {
  position: fixed;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.xs")};
  max-width: 22rem;
  width: calc(100% - 2rem);
  pointer-events: none;
}

.dd-toast-container--top-right    { top: ${toCssVar("space.md")}; right: ${toCssVar("space.md")}; align-items: flex-end; }
.dd-toast-container--top-left     { top: ${toCssVar("space.md")}; left: ${toCssVar("space.md")}; align-items: flex-start; }
.dd-toast-container--bottom-right { bottom: ${toCssVar("space.md")}; right: ${toCssVar("space.md")}; align-items: flex-end; }
.dd-toast-container--bottom-left  { bottom: ${toCssVar("space.md")}; left: ${toCssVar("space.md")}; align-items: flex-start; }

.dd-toast {
  display: flex;
  align-items: flex-start;
  gap: ${toCssVar("space.sm")};
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  background: ${toCssVar("color.surface")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  box-shadow: ${toCssVar("shadow.md")};
  pointer-events: all;
  animation: dd-toast-in 200ms ease-out;
}

@keyframes dd-toast-in {
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to   { opacity: 1; transform: none; }
}

.dd-toast--info    { border-left: 4px solid ${toCssVar("color.primary")}; }
.dd-toast--success { border-left: 4px solid ${toCssVar("color.success")}; }
.dd-toast--warning { border-left: 4px solid ${toCssVar("color.warning")}; }
.dd-toast--danger  { border-left: 4px solid ${toCssVar("color.danger")}; }

.dd-toast__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dd-toast__title {
  font-weight: 600;
  color: ${toCssVar("color.text")};
  font-size: 0.9rem;
}

.dd-toast__message {
  font-size: 0.875rem;
  color: ${toCssVar("color.textMuted")};
  line-height: 1.4;
}

.dd-toast__close {
  background: none;
  border: none;
  color: ${toCssVar("color.textMuted")};
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  flex-shrink: 0;
  transition: color 120ms;
}

.dd-toast__close:hover {
  color: ${toCssVar("color.text")};
}
`;
