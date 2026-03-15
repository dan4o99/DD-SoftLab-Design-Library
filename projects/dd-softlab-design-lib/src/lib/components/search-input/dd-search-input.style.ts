import { toCssVar } from "../../theming/theme-tokens";

export const DD_SEARCH_INPUT_CSS = `
.dd-search-input {
  position: relative;
  display: block;
}

.dd-search-input__icon {
  position: absolute;
  left: ${toCssVar("space.sm")};
  top: 50%;
  transform: translateY(-50%);
  color: ${toCssVar("color.textMuted")};
  pointer-events: none;
  font-size: 1rem;
  line-height: 1;
}

.dd-search-input__field {
  display: block;
  width: 100%;
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  padding-left: 2.25rem;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  font: inherit;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
  transition: border-color 150ms;
}

.dd-search-input__field::placeholder {
  color: ${toCssVar("color.textMuted")};
}

.dd-search-input__field:focus {
  border-color: ${toCssVar("color.primary")};
  outline: 2px solid ${toCssVar("color.primary")};
  outline-offset: 2px;
}

.dd-search-input__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dd-search-input__clear {
  position: absolute;
  right: ${toCssVar("space.sm")};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${toCssVar("color.textMuted")};
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 2px;
  display: flex;
  align-items: center;
  transition: color 120ms;
}

.dd-search-input__clear:hover {
  color: ${toCssVar("color.text")};
}
`;
