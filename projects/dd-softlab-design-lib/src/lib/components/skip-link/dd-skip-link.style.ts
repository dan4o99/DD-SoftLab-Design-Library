import { toCssVar } from "../../theming/theme-tokens";

export const DD_SKIP_LINK_CSS = `
.dd-skip-link {
  position: absolute;
  top: -100%;
  left: ${toCssVar("space.sm")};
  z-index: 9999;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.md")};
  background: ${toCssVar("color.primary")};
  color: ${toCssVar("color.primaryContrast")};
  border-radius: ${toCssVar("radius.md")};
  font-weight: 600;
  text-decoration: none;
  transition: top 0ms;
}

.dd-skip-link:focus {
  top: ${toCssVar("space.sm")};
}
`;
