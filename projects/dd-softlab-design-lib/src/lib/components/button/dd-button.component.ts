import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core";
import {
  DD_BUTTON_CSS,
  DdButtonSize,
  DdButtonVariant,
  resolveDdButtonClasses,
} from "./dd-button.style";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";

@Component({
  selector: "dd-button",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [class]="buttonClass()"
      [attr.style]="buttonStyle()"
      [attr.type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading()"
      (click)="onClick($event)"
    >
      <ng-content />
    </button>
  `,
})
export class DdButtonComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly type = input<"button" | "submit" | "reset">("button");
  readonly variant = input<DdButtonVariant>("primary");
  readonly size = input<DdButtonSize>("medium");
  readonly outlined = input(false, { transform: booleanAttribute });
  readonly text = input(false, { transform: booleanAttribute });
  readonly raised = input(false, { transform: booleanAttribute });
  readonly rounded = input(false, { transform: booleanAttribute });
  readonly fluid = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly iconOnly = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );
  readonly clicked = output<MouseEvent>();

  readonly buttonClass = computed(() =>
    [
      ...resolveDdButtonClasses({
        variant: this.variant(),
        outlined: this.outlined(),
        text: this.text(),
        raised: this.raised(),
        rounded: this.rounded(),
        fluid: this.fluid(),
        loading: this.loading(),
        iconOnly: this.iconOnly(),
        size: this.size(),
      }),
      ...this.normalizedCustomClass(),
    ].join(" "),
  );

  readonly buttonStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("button", DD_BUTTON_CSS);
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

  onClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      return;
    }

    this.clicked.emit(event);
  }
}
