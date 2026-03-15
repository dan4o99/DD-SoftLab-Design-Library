import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
} from "@angular/core";
import { FormCheckboxControl } from "@angular/forms/signals";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SWITCH_CSS } from "./dd-switch.style";

@Component({
  selector: "dd-switch",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="switchClass()" [attr.style]="switchStyle()">
      <button
        class="dd-switch__button"
        type="button"
        role="switch"
        [attr.aria-checked]="isChecked()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        (click)="onToggle($event)"
        (blur)="onBlur()"
      ></button>
      <span class="dd-switch__label" (click)="onToggle($event)">
        <ng-content />
      </span>
    </span>
  `,
})
export class DdSwitchComponent implements FormCheckboxControl {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly checked = model(false);
  readonly touched = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>("Toggle switch");
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly toggled = output<boolean>();
  readonly clicked = output<MouseEvent>();

  readonly isChecked = computed(() => this.checked());

  readonly switchClass = computed(() => {
    const checkedClass = this.isChecked() ? "dd-switch--checked" : "";
    const disabledClass = this.disabled() ? "dd-switch--disabled" : "";

    return [
      "dd-switch",
      checkedClass,
      disabledClass,
      ...this.normalizedCustomClass(),
    ]
      .filter(Boolean)
      .join(" ");
  });

  readonly switchStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle.loadStyle("switch", DD_SWITCH_CSS);
  }

  onToggle(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    this.clicked.emit(event);
    const nextValue = !this.isChecked();
    this.checked.set(nextValue);
    this.toggled.emit(nextValue);
    this.touched.set(true);
  }

  onBlur(): void {
    this.touched.set(true);
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
