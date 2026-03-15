import { toCssVar } from "../../theming/theme-tokens";

export const DD_COMBOBOX_CSS = `
.dd-combobox {
  position: relative;
  display: block;
}

.dd-combobox__input-wrap {
  position: relative;
}

.dd-combobox__input {
  display: block;
  width: 100%;
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  padding-right: 2.25rem;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  font: inherit;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 150ms;
  outline: none;
}

.dd-combobox__input:focus {
  border-color: ${toCssVar("color.primary")};
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-combobox__chevron {
  position: absolute;
  right: ${toCssVar("space.sm")};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${toCssVar("color.textMuted")};
  font-size: 0.75rem;
}

.dd-combobox__listbox {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 500;
  max-height: 14rem;
  overflow-y: auto;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  box-shadow: ${toCssVar("shadow.md")};
  list-style: none;
  margin: 0;
  padding: ${toCssVar("space.xs")} 0;
}

.dd-combobox__option {
  padding: ${toCssVar("space.xs")} ${toCssVar("space.md")};
  cursor: pointer;
  color: ${toCssVar("color.text")};
}

.dd-combobox__option:hover,
.dd-combobox__option--focused {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-combobox__option--selected {
  color: ${toCssVar("color.primary")};
  font-weight: 500;
}

.dd-combobox__empty {
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  color: ${toCssVar("color.textMuted")};
  font-size: 0.875rem;
}
`;
