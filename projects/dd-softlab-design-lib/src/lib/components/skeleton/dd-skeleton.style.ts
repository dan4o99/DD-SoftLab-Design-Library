import { toCssVar } from "../../theming/theme-tokens";

export const DD_SKELETON_CSS = `
.dd-skeleton {
  display: block;
  position: relative;
  overflow: hidden;
  background: color-mix(in srgb, ${toCssVar("color.surfaceAlt")} 82%, ${toCssVar("color.surface")});
  border: 1px solid color-mix(in srgb, ${toCssVar("color.border")} 85%, transparent);
  border-radius: ${toCssVar("radius.md")};
}

.dd-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at center, color-mix(in srgb, ${toCssVar("color.primary")} 20%, transparent) 0, transparent 58%),
    linear-gradient(90deg, transparent, color-mix(in srgb, ${toCssVar("color.surface")} 75%, transparent), transparent);
  transform: translateX(-120%);
  animation: dd-skeleton-ripple 1.6s linear infinite;
}

.dd-skeleton--circle {
  border-radius: 50%;
}

.dd-skeleton--text {
  height: 1em;
  border-radius: ${toCssVar("radius.sm")};
}

@keyframes dd-skeleton-ripple {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(120%); }
}
`;
