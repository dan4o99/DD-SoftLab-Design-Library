import { toCssVar } from "../../theming/theme-tokens";

export type DdSpinnerSize = "small" | "medium" | "large";

export const DD_SPINNER_CSS = `
.dd-spinner {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid ${toCssVar("color.border")};
  border-top-color: ${toCssVar("color.primary")};
  border-radius: 50%;
  animation: dd-spinner-rotate 0.7s linear infinite;
}

.dd-spinner--sm {
  width: 1rem;
  height: 1rem;
  border-width: 2px;
}

.dd-spinner--lg {
  width: 2.5rem;
  height: 2.5rem;
  border-width: 4px;
}

@keyframes dd-spinner-rotate {
  to { transform: rotate(360deg); }
}
`;
