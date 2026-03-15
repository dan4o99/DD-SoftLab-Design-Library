import { toCssVar } from "../../theming/theme-tokens";

export const DD_DROPDOWN_CSS = `
.dd-dropdown {
  display: block;
  width: 100%;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  font: inherit;
  line-height: 1.25;
  transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out;
}

.dd-dropdown-searchable {
  position: relative;
  width: 100%;
}

.dd-dropdown__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${toCssVar("space.sm")};
  text-align: left;
  cursor: pointer;
}

.dd-dropdown__trigger-label {
  min-width: 0;
  flex: 1 1 auto;
}

.dd-dropdown__chevron {
  transition: transform 120ms ease-in-out;
}

.dd-dropdown__chevron--open {
  transform: rotate(180deg);
}

.dd-dropdown__panel {
  position: absolute;
  top: calc(100% + ${toCssVar("space.xs")});
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.xs")};
  padding: ${toCssVar("space.xs")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  box-shadow: ${toCssVar("shadow.md")};
}

.dd-dropdown__search {
  width: 100%;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  font: inherit;
  color: ${toCssVar("color.text")};
  background: ${toCssVar("color.surface")};
}

.dd-dropdown__search:focus {
  outline: none;
  border-color: ${toCssVar("color.primary")};
  box-shadow: 0 0 0 3px color-mix(in srgb, ${toCssVar("color.primary")} 20%, transparent);
}

.dd-dropdown__option {
  width: 100%;
  border: none;
  border-radius: ${toCssVar("radius.sm")};
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  background: transparent;
  color: ${toCssVar("color.text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.dd-dropdown__option:hover:not(:disabled),
.dd-dropdown__option--selected {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-dropdown__option:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dd-dropdown__empty {
  padding: ${toCssVar("space.sm")};
  color: ${toCssVar("color.textSecondary")};
  font-size: 0.875rem;
}

.dd-dropdown:focus {
  border-color: ${toCssVar("color.primary")};
  box-shadow: 0 0 0 3px color-mix(in srgb, ${toCssVar("color.primary")} 20%, transparent);
  outline: none;
}

.dd-dropdown:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
