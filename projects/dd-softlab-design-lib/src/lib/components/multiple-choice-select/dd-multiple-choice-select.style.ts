import { toCssVar } from "../../theming/theme-tokens";

export const DD_MULTIPLE_CHOICE_SELECT_CSS = `
.dd-multiple-choice-select {
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.sm")};
  width: 100%;
}

.dd-multiple-choice-select__label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${toCssVar("color.text")};
  margin-bottom: ${toCssVar("space.xs")};
}

.dd-multiple-choice-select__wrapper {
  display: flex;
  flex-direction: column;
  gap: ${toCssVar("space.xs")};
  position: absolute;
  top: calc(100% + ${toCssVar("space.xs")});
  left: 0;
  right: 0;
  z-index: 10;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.surface")};
  padding: ${toCssVar("space.xs")};
}

.dd-multiple-choice-select__dropdown {
  position: relative;
}

.dd-multiple-choice-select__option {
  display: flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border-radius: ${toCssVar("radius.sm")};
  cursor: pointer;
  user-select: none;
}

.dd-multiple-choice-select__option:hover {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-multiple-choice-select__checkbox {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: ${toCssVar("color.primary")};
}

.dd-multiple-choice-select__option-label {
  flex: 1 1 auto;
  min-width: 0;
  color: ${toCssVar("color.text")};
  font: inherit;
}

.dd-multiple-choice-select__selected-items {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  min-height: 2.5rem;
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.surface")};
  cursor: pointer;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  height: 100%;
}

.dd-multiple-choice-select__selected-items:focus-visible {
  border-color: ${toCssVar("color.primary")};
  box-shadow: 0 0 0 3px color-mix(in srgb, ${toCssVar("color.primary")} 20%, transparent);
  outline: none;
}

.dd-multiple-choice-select__placeholder {
  color: ${toCssVar("color.textSecondary")};
}

.dd-multiple-choice-select__chip {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.primary")};
  color: ${toCssVar("color.surfaceAlt")};
  font-size: 0.875rem;
  flex: 0 0 auto;
}

.dd-multiple-choice-select__remove {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dd-multiple-choice-select__chevron {
  margin-left: auto;
  color: ${toCssVar("color.textSecondary")};
  transition: transform 120ms ease-in-out;
}

.dd-multiple-choice-select__chevron--open {
  transform: rotate(180deg);
}
`;
