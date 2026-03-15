import { toCssVar } from "../../theming/theme-tokens";

export type DdAlertVariant = "info" | "success" | "warning" | "danger";

export const DD_ALERT_CSS = `
.dd-alert {
  display: block;
  border-radius: ${toCssVar("radius.md")};
  border: 1px solid color-mix(in srgb, ${toCssVar("color.primary")} 14%, ${toCssVar("color.border")});
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  background: color-mix(in srgb, ${toCssVar("color.primary")} 12%, ${toCssVar("color.surface")});
  color: ${toCssVar("color.text")};
}

.dd-alert--success {
  border-color: color-mix(in srgb, ${toCssVar("color.success")} 14%, ${toCssVar("color.border")});
  background: color-mix(in srgb, ${toCssVar("color.success")} 14%, ${toCssVar("color.surface")});
}

.dd-alert--warning {
  border-color: color-mix(in srgb, ${toCssVar("color.warning")} 14%, ${toCssVar("color.border")});
  background: color-mix(in srgb, ${toCssVar("color.warning")} 16%, ${toCssVar("color.surface")});
}

.dd-alert--danger {
  border-color: color-mix(in srgb, ${toCssVar("color.danger")} 14%, ${toCssVar("color.border")});
  background: color-mix(in srgb, ${toCssVar("color.danger")} 14%, ${toCssVar("color.surface")});
}
`;
