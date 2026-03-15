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
    @if (removable()) {
      <span [class]="chipClass()" [attr.style]="chipStyle()">
        <button
          class="dd-chip__action"
          type="button"
          [disabled]="disabled()"
          [attr.aria-label]="ariaLabel()"
          (click)="onClick($event)"
        >
          <ng-content />
        </button>
        <button
          class="dd-chip__remove"
          type="button"
          [disabled]="disabled()"
          [attr.aria-label]="removeAriaLabel()"
          (click)="onRemove($event)"
        >
          ×
        </button>
      </span>
    } @else {
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
    }
  `,
})
export class DdChipComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly disabled = input(false, { transform: booleanAttribute });
  readonly removable = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>("Chip");
  readonly removeAriaLabel = input<string>("Remove chip");
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly clicked = output<MouseEvent>();
  readonly removed = output<void>();

  readonly chipClass = computed(() =>
    [
      "dd-chip",
      this.removable() ? "dd-chip--removable" : "",
      ...this.normalizedCustomClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  readonly chipStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle.loadStyle("chip", DD_CHIP_CSS);
  }

  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    this.clicked.emit(event);
  }

  onRemove(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.removed.emit();
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
