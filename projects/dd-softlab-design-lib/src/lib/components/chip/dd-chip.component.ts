import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_CHIP_CSS } from "./dd-chip.style";

@Component({
  selector: "dd-chip",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [class]="chipClass()"
      [attr.style]="chipStyle()"
      type="button"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      (click)="onClick($event)"
    >
      <ng-content />
    </button>
  `,
})
export class DdChipComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>("Chip");
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly clicked = output<MouseEvent>();

  readonly chipClass = computed(() =>
    ["dd-chip", ...this.normalizedCustomClass()].join(" "),
  );

  readonly chipStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("chip", DD_CHIP_CSS);
  }

  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    this.clicked.emit(event);
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
