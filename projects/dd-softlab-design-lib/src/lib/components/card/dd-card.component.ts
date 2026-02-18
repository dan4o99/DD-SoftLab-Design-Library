import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_CARD_CSS } from "./dd-card.style";

@Component({
  selector: "dd-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article [class]="cardClass()" [attr.style]="cardStyle()">
      <ng-content />
    </article>
  `,
})
export class DdCardComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly cardClass = computed(() =>
    ["dd-card", ...this.normalizedCustomClass()].join(" "),
  );
  readonly cardStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("card", DD_CARD_CSS);
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
