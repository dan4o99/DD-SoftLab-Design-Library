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
import { DD_SELECT_CSS } from "./dd-select.style";

@Component({
  selector: "dd-select",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select
      [class]="selectClass()"
      [attr.style]="selectStyle()"
      [value]="value()"
      [attr.name]="name()"
      [attr.id]="id()"
      [required]="required()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      (change)="onChange($event)"
      (click)="onClick($event)"
    >
      <ng-content />
    </select>
  `,
})
export class DdSelectComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly value = input<string>("");
  readonly name = input<string>("");
  readonly id = input<string>("");
  readonly ariaLabel = input<string>("");
  readonly required = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly valueChange = output<string>();
  readonly clicked = output<MouseEvent>();

  readonly selectClass = computed(() =>
    ["dd-select", ...this.normalizedCustomClass()].join(" "),
  );

  readonly selectStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("select", DD_SELECT_CSS);
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
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
