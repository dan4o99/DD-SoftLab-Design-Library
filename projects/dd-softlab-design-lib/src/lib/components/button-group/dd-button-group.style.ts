import { toCssVar } from "../../theming/theme-tokens";

export const DD_BUTTON_GROUP_CSS = `
.dd-button-group {
  display: inline-flex;
  align-items: stretch;
}

.dd-button-group > .dd-button {
  border-radius: 0;
  box-shadow: none;
  border-right-width: 0;
}

.dd-button-group > .dd-button:first-child {
  border-radius: ${toCssVar("radius.md")} 0 0 ${toCssVar("radius.md")};
}

.dd-button-group > .dd-button:last-child {
  border-radius: 0 ${toCssVar("radius.md")} ${toCssVar("radius.md")} 0;
  border-right-width: 1px;
}

.dd-button-group > .dd-button:only-child {
  border-radius: ${toCssVar("radius.md")};
  border-right-width: 1px;
}

.dd-button-group > .dd-button--secondary,
.dd-button-group > .dd-button--ghost,
.dd-button-group > .dd-button--outlined {
  border-right-width: 0;
}

.dd-button-group > .dd-button--secondary:last-child,
.dd-button-group > .dd-button--ghost:last-child,
.dd-button-group > .dd-button--outlined:last-child {
  border-right-width: 1px;
}

.dd-button-group--vertical {
  flex-direction: column;
}

.dd-button-group--vertical > .dd-button {
  border-right-width: 1px;
  border-bottom-width: 0;
}

.dd-button-group--vertical > .dd-button:first-child {
  border-radius: ${toCssVar("radius.md")} ${toCssVar("radius.md")} 0 0;
}

.dd-button-group--vertical > .dd-button:last-child {
  border-radius: 0 0 ${toCssVar("radius.md")} ${toCssVar("radius.md")};
  border-bottom-width: 1px;
}
`;
