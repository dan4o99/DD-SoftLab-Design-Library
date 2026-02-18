import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_ACCORDION_CSS } from "./dd-accordion.style";

@Component({
  selector: "dd-accordion",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="accordionClass()" [attr.style]="accordionStyle()">
      <button
        class="dd-accordion__header"
        type="button"
        [disabled]="disabled()"
        [attr.aria-expanded]="isOpen()"
        (click)="onHeaderClick($event)"
      >
        <span><ng-content select="[accordion-header]" /></span>
        <span
          class="dd-accordion__arrow"
          [class.dd-accordion__arrow--open]="isOpen()"
          >▼</span
        >
      </button>
      <div
        class="dd-accordion__content"
        [class.dd-accordion__content--open]="isOpen()"
      >
        <ng-content select="[accordion-content]" />
      </div>
    </section>
  `,
})
export class DdAccordionComponent {
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly internalOpen = signal(false);

  readonly open = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly openChange = output<boolean>();
  readonly clicked = output<MouseEvent>();

  readonly isOpen = computed(() => this.internalOpen());

  readonly accordionClass = computed(() =>
    ["dd-accordion", ...this.normalizedCustomClass()].join(" "),
  );

  readonly accordionStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("accordion", DD_ACCORDION_CSS);
    this.internalOpen.set(this.open());
  }

  onHeaderClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    const nextValue = !this.isOpen();
    this.internalOpen.set(nextValue);
    this.clicked.emit(event);
    this.openChange.emit(nextValue);
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
