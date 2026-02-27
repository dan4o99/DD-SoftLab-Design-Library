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
import { DD_DATE_PICKER_CSS } from "./dd-date-picker.style";

@Component({
  selector: "dd-date-picker",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdDatePickerComponent),
      multi: true,
    },
  ],
  template: `
    <div [class]="wrapperClass()" [attr.style]="wrapperStyle()">
      @if (label()) {
        <label class="dd-date-picker__label" [attr.for]="id()">
          {{ label() }}
        </label>
      }
      <input
        type="date"
        class="dd-date-picker__input"
        [value]="value()"
        [attr.id]="id()"
        [attr.name]="name()"
        [attr.min]="minDate()"
        [attr.max]="maxDate()"
        [disabled]="isDisabled()"
        [attr.placeholder]="placeholder()"
        [attr.aria-label]="ariaLabel()"
        (input)="onInput($event)"
        (click)="onClick($event)"
        (blur)="onBlur()"
      />
    </div>
  `,
})
export class DdDatePickerComponent
  implements ControlValueAccessor, FormValueControl<string>
{
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly cvaDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly id = input<string>("");
  readonly name = input<string>("");
  readonly label = input<string>("");
  readonly value = model<string>("");
  readonly touched = model(false);
  readonly minDate = input<string>("", { alias: "min" });
  readonly maxDate = input<string>("", { alias: "max" });
  readonly placeholder = input<string>("Select a date");
  readonly ariaLabel = input<string>("Date picker");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly changed = output<string>();
  readonly clicked = output<MouseEvent>();

  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly wrapperClass = computed(() =>
    ["dd-date-picker", ...this.normalizedCustomClass()].join(" "),
  );

  readonly wrapperStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("date-picker", DD_DATE_PICKER_CSS);
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

  /** Emits the selected date value and the changed event. */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const nextValue = target.value;
    this.value.set(nextValue);
    this.onChange(nextValue);
    this.changed.emit(nextValue);
  }

  /** Emits the click event when date picker is clicked. */
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
    this.value.set(value ?? "");
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
