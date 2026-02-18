import { toCssVar } from "../../theming/theme-tokens";

export const DD_BUTTON_BASE_CLASSES = {
  root: "dd-button",
  secondary: "dd-button--secondary",
  danger: "dd-button--danger",
  success: "dd-button--success",
  warning: "dd-button--warning",
  ghost: "dd-button--ghost",
  link: "dd-button--link",
  outlined: "dd-button--outlined",
  text: "dd-button--text",
  raised: "dd-button--raised",
  rounded: "dd-button--rounded",
  small: "dd-button--sm",
  large: "dd-button--lg",
  fluid: "dd-button--fluid",
  loading: "dd-button--loading",
  iconOnly: "dd-button--icon-only",
} as const;

export type DdButtonSize = "small" | "medium" | "large";
export type DdButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "ghost"
  | "link";

export interface DdButtonClassOptions {
  variant: DdButtonVariant;
  outlined: boolean;
  text: boolean;
  raised: boolean;
  rounded: boolean;
  fluid: boolean;
  loading: boolean;
  iconOnly: boolean;
  size: DdButtonSize;
}

export function resolveDdButtonClasses(
  options: DdButtonClassOptions,
): string[] {
  const classes: string[] = [DD_BUTTON_BASE_CLASSES.root];

  if (options.variant === "secondary") {
    classes.push(DD_BUTTON_BASE_CLASSES.secondary);
  }

  if (options.variant === "danger") {
    classes.push(DD_BUTTON_BASE_CLASSES.danger);
  }

  if (options.variant === "success") {
    classes.push(DD_BUTTON_BASE_CLASSES.success);
  }

  if (options.variant === "warning") {
    classes.push(DD_BUTTON_BASE_CLASSES.warning);
  }

  if (options.variant === "ghost") {
    classes.push(DD_BUTTON_BASE_CLASSES.ghost);
  }

  if (options.variant === "link") {
    classes.push(DD_BUTTON_BASE_CLASSES.link);
  }

  if (options.outlined) {
    classes.push(DD_BUTTON_BASE_CLASSES.outlined);
  }

  if (options.text) {
    classes.push(DD_BUTTON_BASE_CLASSES.text);
  }

  if (options.raised) {
    classes.push(DD_BUTTON_BASE_CLASSES.raised);
  }

  if (options.rounded) {
    classes.push(DD_BUTTON_BASE_CLASSES.rounded);
  }

  if (options.fluid) {
    classes.push(DD_BUTTON_BASE_CLASSES.fluid);
  }

  if (options.loading) {
    classes.push(DD_BUTTON_BASE_CLASSES.loading);
  }

  if (options.iconOnly) {
    classes.push(DD_BUTTON_BASE_CLASSES.iconOnly);
  }

  if (options.size === "small") {
    classes.push(DD_BUTTON_BASE_CLASSES.small);
  }

  if (options.size === "large") {
    classes.push(DD_BUTTON_BASE_CLASSES.large);
  }

  return classes;
}

export const DD_BUTTON_CSS = `
.dd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${toCssVar("space.xs")};
  border: none;
  outline: none;
  border-radius: ${toCssVar("radius.md")};
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  background: ${toCssVar("color.primary")};
  color: ${toCssVar("color.primaryContrast")};
  box-shadow: ${toCssVar("shadow.sm")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
  transition: filter 120ms ease-in-out, transform 120ms ease-in-out, box-shadow 120ms ease-in-out;
}

.dd-button:hover {
  filter: brightness(0.96);
}

.dd-button:active {
  transform: translateY(1px);
}

.dd-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dd-button--secondary {
  border: 1px solid ${toCssVar("color.border")};
  background: ${toCssVar("color.surfaceAlt")};
  color: ${toCssVar("color.text")};
  box-shadow: none;
}

.dd-button--secondary:hover {
  filter: brightness(1);
  box-shadow: ${toCssVar("shadow.sm")};
}

.dd-button--danger {
  background: ${toCssVar("color.danger")};
  color: ${toCssVar("color.dangerContrast")};
  box-shadow: ${toCssVar("shadow.sm")};
}

.dd-button--danger:hover {
  filter: brightness(0.92);
}

.dd-button--success {
  background: ${toCssVar("color.success")};
  color: ${toCssVar("color.successContrast")};
  box-shadow: ${toCssVar("shadow.sm")};
}

.dd-button--success:hover {
  filter: brightness(0.92);
}

.dd-button--warning {
  background: ${toCssVar("color.warning")};
  color: ${toCssVar("color.warningContrast")};
  box-shadow: ${toCssVar("shadow.sm")};
}

.dd-button--warning:hover {
  filter: brightness(0.92);
}

.dd-button--ghost {
  border: 1px solid ${toCssVar("color.border")};
  background: transparent;
  color: ${toCssVar("color.text")};
  box-shadow: none;
}

.dd-button--ghost:hover {
  background: ${toCssVar("color.surfaceAlt")};
  box-shadow: ${toCssVar("shadow.sm")};
}

.dd-button--link {
  background: transparent;
  color: ${toCssVar("color.primary")};
  box-shadow: none;
  text-decoration: underline;
}

.dd-button--link:hover {
  opacity: 0.8;
}

.dd-button--outlined {
  border: 1px solid ${toCssVar("color.primary")};
  background: transparent;
  color: ${toCssVar("color.primary")};
  box-shadow: none;
}

.dd-button--outlined:hover {
  box-shadow: ${toCssVar("shadow.sm")};
}

.dd-button--text {
  background: transparent;
  color: ${toCssVar("color.primary")};
  box-shadow: none;
}

.dd-button--raised {
  box-shadow: ${toCssVar("shadow.md")};
}

.dd-button--rounded {
  border-radius: 999px;
}

.dd-button--sm {
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  font-size: 0.875em;
}

.dd-button--lg {
  padding: calc(${toCssVar("space.sm")} + 0.125rem) calc(${toCssVar("space.md")} + 0.25rem);
  font-size: 1.0625em;
}

.dd-button--fluid {
  display: block;
  width: 100%;
}

.dd-button--icon-only {
  aspect-ratio: 1 / 1;
  padding-inline: ${toCssVar("space.sm")};
}

.dd-button--loading {
  pointer-events: none;
}
`;
