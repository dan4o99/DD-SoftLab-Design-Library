import { toCssVar } from "../../theming/theme-tokens";

export const DD_QUOTE_CSS = `
.dd-quote {
  margin: 0;
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  border-left: 4px solid ${toCssVar("color.primary")};
  background: ${toCssVar("color.surfaceAlt")};
  border-radius: 0 ${toCssVar("radius.sm")} ${toCssVar("radius.sm")} 0;
}

.dd-quote p,
.dd-quote__body {
  margin: 0;
  font-style: italic;
  color: ${toCssVar("color.text")};
  line-height: 1.6;
}

.dd-quote__cite {
  display: block;
  margin-top: ${toCssVar("space.xs")};
  font-size: 0.875rem;
  font-style: normal;
  color: ${toCssVar("color.textMuted")};
}

.dd-quote__cite::before {
  content: "— ";
}
`;
