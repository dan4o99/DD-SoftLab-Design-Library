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
import { DD_INPUT_CSS } from "./dd-input.style";

@Component({
  selector: "dd-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      (input)="onInput($event)"
      (click)="onClick($event)"
    />
  `,
})
export class DdInputComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly type = input<"text" | "email" | "password" | "number" | "search">(
    "text",
  );
  readonly value = input<string>("");
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

  readonly valueChange = output<string>();
  readonly clicked = output<MouseEvent>();

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
    this.valueChange.emit(target?.value ?? "");
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
