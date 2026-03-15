import { toCssVar } from "../../theming/theme-tokens";

export type DdPopoverPosition = "top" | "bottom" | "left" | "right";

export const DD_POPOVER_CSS = `
.dd-popover-host {
  position: relative;
  display: inline-flex;
}

.dd-popover {
  position: absolute;
  z-index: 600;
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  box-shadow: ${toCssVar("shadow.md")};
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  min-width: 14rem;
  animation: dd-popover-fade 150ms ease-out;
}

.dd-popover--top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.dd-popover--bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.dd-popover--left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.dd-popover--right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.dd-popover__title {
  margin: 0 0 ${toCssVar("space.xs")};
  font-size: 0.875rem;
  font-weight: 600;
}

@keyframes dd-popover-fade {
  from { opacity: 0; transform: translateX(-50%) scale(0.97); }
  to { opacity: 1; transform: translateX(-50%) scale(1); }
}
`;
