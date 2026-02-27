import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormCheckboxControl } from "@angular/forms/signals";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SWITCH_CSS } from "./dd-switch.style";

@Component({
  selector: "dd-switch",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdSwitchComponent),
      multi: true,
    },
  ],
  template: `
    <span [class]="switchClass()" [attr.style]="switchStyle()">
      <button
        class="dd-switch__button"
        type="button"
        role="switch"
        [attr.aria-checked]="isChecked()"
        [disabled]="isDisabled()"
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
export class DdSwitchComponent
  implements ControlValueAccessor, FormCheckboxControl
{
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly cvaDisabled = signal(false);

  private onControlChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

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
  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly switchClass = computed(() => {
    const checkedClass = this.isChecked() ? "dd-switch--checked" : "";
    const disabledClass = this.isDisabled() ? "dd-switch--disabled" : "";

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
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("switch", DD_SWITCH_CSS);
  }

  onToggle(event: MouseEvent): void {
    if (this.isDisabled()) {
      return;
    }

    this.clicked.emit(event);
    const nextValue = !this.isChecked();
    this.checked.set(nextValue);
    this.onControlChange(nextValue);
    this.toggled.emit(nextValue);
  }

  onBlur(): void {
    this.touched.set(true);
    this.onTouched();
  }

  writeValue(value: boolean | null): void {
    this.checked.set(Boolean(value));
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onControlChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
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
