import { toCssVar } from "../../theming/theme-tokens";

export type DdBadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export const DD_BADGE_CSS = `
.dd-badge {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  border-radius: 999px;
  padding: 0.125rem ${toCssVar("space.sm")};
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
  background: ${toCssVar("color.surfaceAlt")};
  color: ${toCssVar("color.text")};
  border: 1px solid ${toCssVar("color.border")};
}

.dd-badge--primary {
  background: ${toCssVar("color.primary")};
  color: ${toCssVar("color.primaryContrast")};
  border-color: transparent;
}

.dd-badge--success {
  background: ${toCssVar("color.success")};
  color: ${toCssVar("color.successContrast")};
  border-color: transparent;
}

.dd-badge--warning {
  background: ${toCssVar("color.warning")};
  color: ${toCssVar("color.warningContrast")};
  border-color: transparent;
}

.dd-badge--danger {
  background: ${toCssVar("color.danger")};
  color: ${toCssVar("color.dangerContrast")};
  border-color: transparent;
}
`;
