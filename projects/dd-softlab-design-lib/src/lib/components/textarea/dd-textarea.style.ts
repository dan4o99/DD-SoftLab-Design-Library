import { toCssVar } from "../../theming/theme-tokens";

export const DD_TEXTAREA_CSS = `
.dd-textarea {
  display: block;
  width: 100%;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  font: inherit;
  line-height: 1.35;
  resize: vertical;
  min-height: 6rem;
  transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out;
}

.dd-textarea:focus {
  border-color: ${toCssVar("color.primary")};
  box-shadow: 0 0 0 3px color-mix(in srgb, ${toCssVar("color.primary")} 20%, transparent);
  outline: none;
}

.dd-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`;
