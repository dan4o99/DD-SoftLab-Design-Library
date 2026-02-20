import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_MENU_ITEM_CSS } from "./dd-menu-item.style";

@Component({
  selector: "dd-menu-item",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [class]="menuItemClass()"
      [attr.style]="menuItemStyle()"
      [href]="href()"
      [target]="target()"
      [attr.rel]="rel()"
      [routerLink]="routerLink()"
      [routerLinkActive]="routerLinkActiveClass()"
      [routerLinkActiveOptions]="routerLinkActiveOptions()"
      [attr.role]="isLink() ? null : 'button'"
      [attr.tabindex]="disabled() ? '-1' : isLink() ? null : '0'"
      [attr.aria-disabled]="disabled()"
      (click)="onClick($event)"
    >
      <span class="dd-menu-item__label"><ng-content /></span>
    </a>
  `,
})
export class DdMenuItemComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly href = input<string>("");
  readonly routerLink = input<string | string[] | null>(null);
  readonly routerLinkActiveClass = input<string>("dd-menu-item--active");
  readonly routerLinkActiveOptions = input<{ exact: boolean }>({
    exact: false,
  });
  readonly target = input<"_self" | "_blank" | "_parent" | "_top">("_self");
  readonly rel = input<string>("noopener noreferrer");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly clicked = output<MouseEvent>();

  readonly isLink = computed(() => {
    const hrefValue = this.href().trim();
    const routerValue = this.routerLink();
    const hasRouterLink = Array.isArray(routerValue)
      ? routerValue.length > 0
      : typeof routerValue === "string"
        ? routerValue.trim().length > 0
        : routerValue !== null && routerValue !== undefined;

    return hrefValue.length > 0 || hasRouterLink;
  });

  readonly menuItemClass = computed(() => {
    const disabledClass = this.disabled() ? "dd-menu-item--disabled" : "";
    return ["dd-menu-item", disabledClass, ...this.normalizedCustomClass()]
      .filter(Boolean)
      .join(" ");
  });

  readonly menuItemStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("menu-item", DD_MENU_ITEM_CSS);
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
