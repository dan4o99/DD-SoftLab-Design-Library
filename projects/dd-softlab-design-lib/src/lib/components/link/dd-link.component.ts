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
import { DD_LINK_CSS } from "./dd-link.style";

@Component({
  selector: "dd-link",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [class]="linkClass()"
      [attr.style]="linkStyle()"
      [attr.href]="disabled() ? null : href()"
      [attr.target]="target()"
      [attr.rel]="rel()"
      [attr.aria-disabled]="disabled()"
      (click)="onClick($event)"
    >
      <ng-content />
    </a>
  `,
})
export class DdLinkComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly href = input<string>("#");
  readonly target = input<"_self" | "_blank" | "_parent" | "_top">("_self");
  readonly rel = input<string>("noopener noreferrer");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly clicked = output<MouseEvent>();

  readonly linkClass = computed(() => {
    const disabledClass = this.disabled() ? "dd-link--disabled" : "";
    return ["dd-link", disabledClass, ...this.normalizedCustomClass()]
      .filter(Boolean)
      .join(" ");
  });

  readonly linkStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("link", DD_LINK_CSS);
  }

  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      event.preventDefault();
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
