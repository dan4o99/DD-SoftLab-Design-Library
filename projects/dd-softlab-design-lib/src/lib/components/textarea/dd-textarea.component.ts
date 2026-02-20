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
import { DD_TEXTAREA_CSS } from "./dd-textarea.style";

@Component({
  selector: "dd-textarea",
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      (input)="onInput($event)"
      (click)="onClick($event)"
    ></textarea>
  `,
})
export class DdTextareaComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly value = input<string>("");
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

  readonly valueChange = output<string>();
  readonly clicked = output<MouseEvent>();

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
