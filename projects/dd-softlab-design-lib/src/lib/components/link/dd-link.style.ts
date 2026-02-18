import { toCssVar } from "../../theming/theme-tokens";

export const DD_LINK_CSS = `
.dd-link {
  color: ${toCssVar("color.primary")};
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}

.dd-link:hover {
  opacity: 0.8;
}

.dd-link--disabled {
  color: ${toCssVar("color.textMuted")};
  cursor: not-allowed;
  text-decoration: none;
  pointer-events: none;
}
`;
