import { toCssVar } from "../../theming/theme-tokens";

export type DdProgressBarVariant = "primary" | "success" | "warning" | "danger";

export const DD_PROGRESS_BAR_CSS = `
.dd-progress-bar {
  display: block;
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  background: ${toCssVar("color.surfaceAlt")};
  overflow: hidden;
}

.dd-progress-bar__fill {
  height: 100%;
  border-radius: 999px;
  background: ${toCssVar("color.primary")};
  transition: width 300ms ease-in-out;
}

.dd-progress-bar--success .dd-progress-bar__fill {
  background: ${toCssVar("color.success")};
}

.dd-progress-bar--warning .dd-progress-bar__fill {
  background: ${toCssVar("color.warning")};
}

.dd-progress-bar--danger .dd-progress-bar__fill {
  background: ${toCssVar("color.danger")};
}

.dd-progress-bar--lg {
  height: 0.75rem;
}

.dd-progress-bar--sm {
  height: 0.25rem;
}
`;
