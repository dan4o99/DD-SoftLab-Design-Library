import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_ALERT_CSS, DdAlertVariant } from "./dd-alert.style";

@Component({
  selector: "dd-alert",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="alertClass()"
      [attr.style]="alertStyle()"
      [attr.role]="role()"
    >
      <ng-content />
    </div>
  `,
})
export class DdAlertComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly variant = input<DdAlertVariant>("info");
  readonly role = input<"status" | "alert">("status");
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly alertClass = computed(() => {
    const variantClass =
      this.variant() === "success"
        ? "dd-alert--success"
        : this.variant() === "warning"
          ? "dd-alert--warning"
          : this.variant() === "danger"
            ? "dd-alert--danger"
            : "";

    return ["dd-alert", variantClass, ...this.normalizedCustomClass()]
      .filter(Boolean)
      .join(" ");
  });

  readonly alertStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("alert", DD_ALERT_CSS);
  }

  private normalizedCustomClass(): string[] {
    const value = this.customClass().trim();
    return value ? value.split(/\s+/) : [];
  }

  private normalizeStyleValue(
    style: string | Record<string, string | number> | null,
  ): string | null {
    if (!style) {
      return null;
    }

    if (typeof style === "string") {
      const normalized = style.trim();
      return normalized.length > 0 ? normalized : null;
    }

    const entries = Object.entries(style)
      .filter(([, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}: ${value};`);

    return entries.length > 0 ? entries.join(" ") : null;
  }
}
