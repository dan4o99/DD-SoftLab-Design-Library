import { toCssVar } from "../../theming/theme-tokens";

export type DdAlertVariant = "info" | "success" | "warning" | "danger";

export const DD_ALERT_CSS = `
.dd-alert {
  display: block;
  border-radius: ${toCssVar("radius.md")};
  border: 1px solid ${toCssVar("color.border")};
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  background: ${toCssVar("color.surfaceAlt")};
  color: ${toCssVar("color.text")};
}

.dd-alert--success {
  border-color: ${toCssVar("color.success")};
}

.dd-alert--warning {
  border-color: ${toCssVar("color.warning")};
}

.dd-alert--danger {
  border-color: ${toCssVar("color.danger")};
}
`;
