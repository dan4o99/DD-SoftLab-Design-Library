import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
  model,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormValueControl } from "@angular/forms/signals";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_INPUT_CSS } from "./dd-input.style";

@Component({
  selector: "dd-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdInputComponent),
      multi: true,
    },
  ],
  template: `
    <input
      [class]="inputClass()"
      [attr.style]="inputStyle()"
      [attr.type]="type()"
      [value]="value()"
      [attr.placeholder]="placeholder()"
      [attr.name]="name()"
      [attr.id]="id()"
      [required]="required()"
      [readonly]="readonly()"
      [disabled]="isDisabled()"
      [attr.aria-label]="ariaLabel()"
      (input)="onInput($event)"
      (click)="onClick($event)"
      (blur)="onBlur()"
    />
  `,
})
export class DdInputComponent
  implements ControlValueAccessor, FormValueControl<string>
{
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly cvaDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly type = input<"text" | "email" | "password" | "number" | "search">(
    "text",
  );
  readonly value = model<string>("");
  readonly placeholder = input<string>("");
  readonly name = input<string>("");
  readonly id = input<string>("");
  readonly ariaLabel = input<string>("");
  readonly required = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly clicked = output<MouseEvent>();

  readonly touched = model(false);
  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly inputClass = computed(() =>
    ["dd-input", ...this.normalizedCustomClass()].join(" "),
  );

  readonly inputStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("input", DD_INPUT_CSS);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const nextValue = target?.value ?? "";
    this.value.set(nextValue);
    this.onChange(nextValue);
  }

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
