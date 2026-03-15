import { toCssVar } from "../../theming/theme-tokens";

export type DdTooltipPosition = "top" | "bottom" | "left" | "right";

export const DD_TOOLTIP_CSS = `
.dd-tooltip-host {
  position: relative;
  display: inline-flex;
}

.dd-tooltip {
  position: absolute;
  z-index: 1100;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.text")};
  color: ${toCssVar("color.surface")};
  font-size: 0.75rem;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  animation: dd-tooltip-fade 120ms ease-out;
}

.dd-tooltip--top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 6px;
}

.dd-tooltip--bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 6px;
}

.dd-tooltip--left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 6px;
}

.dd-tooltip--right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 6px;
}

@keyframes dd-tooltip-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;
