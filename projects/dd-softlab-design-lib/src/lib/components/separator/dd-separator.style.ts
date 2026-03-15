import { toCssVar } from "../../theming/theme-tokens";

export type DdSeparatorOrientation = "horizontal" | "vertical";

export const DD_SEPARATOR_CSS = `
.dd-separator {
  border: none;
  margin: ${toCssVar("space.md")} 0;
  border-top: 1px solid ${toCssVar("color.border")};
}

.dd-separator--vertical {
  display: inline-block;
  border-top: none;
  border-left: 1px solid ${toCssVar("color.border")};
  margin: 0 ${toCssVar("space.md")};
  height: 1em;
  vertical-align: middle;
}
`;
