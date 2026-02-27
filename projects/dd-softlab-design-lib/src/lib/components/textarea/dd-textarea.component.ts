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
import { DD_TEXTAREA_CSS } from "./dd-textarea.style";

@Component({
  selector: "dd-textarea",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DdTextareaComponent),
      multi: true,
    },
  ],
  template: `
    <textarea
      [class]="textareaClass()"
      [attr.style]="textareaStyle()"
      [value]="value()"
      [attr.placeholder]="placeholder()"
      [attr.name]="name()"
      [attr.id]="id()"
      [attr.rows]="rows()"
      [required]="required()"
      [readonly]="readonly()"
      [disabled]="isDisabled()"
      [attr.aria-label]="ariaLabel()"
      (input)="onInput($event)"
      (click)="onClick($event)"
      (blur)="onBlur()"
    ></textarea>
  `,
})
export class DdTextareaComponent
  implements ControlValueAccessor, FormValueControl<string>
{
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly cvaDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  readonly value = model<string>("");
  readonly touched = model(false);
  readonly placeholder = input<string>("");
  readonly name = input<string>("");
  readonly id = input<string>("");
  readonly ariaLabel = input<string>("");
  rows = input<number>(4);
  readonly required = input(false, { transform: booleanAttribute });
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly clicked = output<MouseEvent>();
  readonly isDisabled = computed(() => this.disabled() || this.cvaDisabled());

  readonly textareaClass = computed(() =>
    ["dd-textarea", ...this.normalizedCustomClass()].join(" "),
  );

  readonly textareaStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("textarea", DD_TEXTAREA_CSS);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement | null;
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
