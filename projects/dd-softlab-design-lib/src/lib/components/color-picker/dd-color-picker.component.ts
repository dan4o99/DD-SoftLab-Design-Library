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
import { FormValueControl } from "@angular/forms/signals";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_COLOR_PICKER_CSS } from "./dd-color-picker.style";

@Component({
  selector: "dd-color-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdColorPickerComponent),
      multi: true,
    },
  ],
  template: `
    <div [class]="wrapperClass()" [attr.style]="wrapperStyle()">
      @if (label()) {
        <label class="dd-color-picker__label" [attr.for]="id()">
          {{ label() }}
        </label>
      }
      <div class="dd-color-picker__input-wrapper">
        <input
          type="color"
          class="dd-color-picker__input"
          [value]="value()"
          [attr.id]="id()"
          [attr.name]="name()"
          [disabled]="isDisabled()"
          [attr.aria-label]="ariaLabel()"
          (input)="onInput($event)"
          (click)="onClick($event)"
          (blur)="onBlur()"
        />
        <input
          type="text"
          class="dd-color-picker__text-input"
          [value]="value()"
          [disabled]="isDisabled()"
          [attr.placeholder]="placeholder()"
          [attr.aria-label]="ariaLabel() + ' hex value'"
          (input)="onTextInput($event)"
          (blur)="onBlur()"
        />
      </div>
    </div>
  `,
})
export class DdColorPickerComponent
  implements ControlValueAccessor, FormValueControl<string>
{
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly cvaDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly id = input<string>("");
  readonly name = input<string>("");
  readonly label = input<string>("");
  readonly value = model<string>("#000000");
  readonly touched = model(false);
  readonly placeholder = input<string>("e.g. #FF0000");
  readonly ariaLabel = input<string>("Color picker");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly changed = output<string>();
  readonly clicked = output<MouseEvent>();

  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly wrapperClass = computed(() =>
    ["dd-color-picker", ...this.normalizedCustomClass()].join(" "),
  );

  readonly wrapperStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("color-picker", DD_COLOR_PICKER_CSS);
  }

  private normalizedCustomClass(): string[] {
    return this.customClass()
      .split(" ")
      .filter((cls) => cls.trim().length > 0);
  }

  private normalizeStyleValue(
    value: string | Record<string, string | number> | null,
  ): string | null {
    if (!value) return null;
    if (typeof value === "string") return value;
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join("; ");
  }

  /** Emits color value and the changed event when color input changes. */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const nextValue = target.value;
    this.value.set(nextValue);
    this.onChange(nextValue);
    this.changed.emit(nextValue);
  }

  /** Emits color value and the changed event when text input changes. */
  onTextInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const nextValue = target.value;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(nextValue)) {
      this.value.set(nextValue);
      this.onChange(nextValue);
      this.changed.emit(nextValue);
    }
  }

  /** Emits the click event when color picker is clicked. */
  onClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      return;
    }
    this.clicked.emit(event);
  }

  onBlur(): void {
    this.touched.set(true);
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? "#000000");
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
