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
import { DD_RADIO_CSS } from "./dd-radio.style";

@Component({
  selector: "dd-radio",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="radioClass()" [attr.style]="radioStyle()">
      <input
        type="radio"
        [checked]="checked()"
        [disabled]="disabled()"
        [required]="required()"
        [attr.name]="name()"
        [attr.id]="id()"
        [value]="value()"
        [attr.aria-label]="ariaLabel()"
        (change)="onChange($event)"
        (click)="onClick($event)"
      />
      <span><ng-content /></span>
    </label>
  `,
})
export class DdRadioComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly value = input<string>("");
  readonly name = input<string>("");
  readonly id = input<string>("");
  readonly ariaLabel = input<string>("");
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly selected = output<string>();
  readonly clicked = output<MouseEvent>();

  readonly radioClass = computed(() => {
    const disabledClass = this.disabled() ? "dd-radio--disabled" : "";
    return ["dd-radio", disabledClass, ...this.normalizedCustomClass()]
      .filter(Boolean)
      .join(" ");
  });

  readonly radioStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("radio", DD_RADIO_CSS);
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    if (target?.checked) {
      this.selected.emit(target.value);
    }
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
