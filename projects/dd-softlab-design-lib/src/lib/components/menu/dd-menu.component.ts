import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_MENU_CSS } from "./dd-menu.style";

export interface DdMenuItemClickEvent {
  event: MouseEvent;
  href: string | null;
}

@Component({
  selector: "dd-menu",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      [class]="menuClass()"
      [attr.style]="menuStyle()"
      [attr.aria-label]="ariaLabel()"
      (click)="onClick($event)"
    >
      <ng-content />
    </nav>
  `,
})
export class DdMenuComponent {
  private readonly dynamicStyle: DdDynamicStyleService;

  readonly ariaLabel = input<string>("Menu");
  readonly orientation = input<"vertical" | "horizontal">("vertical");
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly clicked = output<MouseEvent>();
  readonly itemClicked = output<DdMenuItemClickEvent>();

  readonly menuClass = computed(() => {
    const orientationClass =
      this.orientation() === "horizontal" ? "dd-menu--horizontal" : "";

    return ["dd-menu", orientationClass, ...this.normalizedCustomClass()]
      .filter(Boolean)
      .join(" ");
  });

  readonly menuStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("menu", DD_MENU_CSS);
  }

  onClick(event: MouseEvent): void {
    this.clicked.emit(event);

    const target = event.target as HTMLElement | null;
    const link = target?.closest("a");

    this.itemClicked.emit({
      event,
      href: link?.getAttribute("href") ?? null,
    });
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
