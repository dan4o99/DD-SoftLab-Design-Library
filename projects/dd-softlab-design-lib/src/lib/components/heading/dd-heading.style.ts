import { toCssVar } from "../../theming/theme-tokens";

export type DdHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const DD_HEADING_CSS = `
.dd-heading {
  margin: 0 0 ${toCssVar("space.sm")};
  font-family: ${toCssVar("font.family.base")};
  line-height: 1.25;
  color: ${toCssVar("color.text")};
}

.dd-heading--1 { font-size: 2.25rem; font-weight: 700; }
.dd-heading--2 { font-size: 1.75rem; font-weight: 700; }
.dd-heading--3 { font-size: 1.375rem; font-weight: 600; }
.dd-heading--4 { font-size: 1.125rem; font-weight: 600; }
.dd-heading--5 { font-size: 1rem; font-weight: 600; }
.dd-heading--6 { font-size: 0.875rem; font-weight: 600; }

.dd-heading--muted { color: ${toCssVar("color.textMuted")}; }
`;
