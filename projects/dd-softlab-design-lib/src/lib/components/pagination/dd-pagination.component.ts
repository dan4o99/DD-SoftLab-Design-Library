import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_PAGINATION_CSS } from "./dd-pagination.style";

export interface DdPaginationPage {
  type: "page" | "ellipsis";
  value: number;
}

@Component({
  selector: "dd-pagination",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [attr.aria-label]="ariaLabel()">
      <ul [class]="paginationClass()">
        <li class="dd-pagination__item">
          <button
            class="dd-pagination__btn"
            [disabled]="currentPage() <= 1"
            aria-label="Previous page"
            (click)="goTo(currentPage() - 1)"
          >
            &lsaquo;
          </button>
        </li>
        @for (page of pages(); track page.value) {
          <li class="dd-pagination__item">
            @if (page.type === "ellipsis") {
              <span class="dd-pagination__ellipsis">&hellip;</span>
            } @else {
              <button
                [class]="
                  page.value === currentPage()
                    ? 'dd-pagination__btn dd-pagination__btn--active'
                    : 'dd-pagination__btn'
                "
                [attr.aria-current]="
                  page.value === currentPage() ? 'page' : null
                "
                (click)="goTo(page.value)"
              >
                {{ page.value }}
              </button>
            }
          </li>
        }
        <li class="dd-pagination__item">
          <button
            class="dd-pagination__btn"
            [disabled]="currentPage() >= totalPages()"
            aria-label="Next page"
            (click)="goTo(currentPage() + 1)"
          >
            &rsaquo;
          </button>
        </li>
      </ul>
    </nav>
  `,
})
export class DdPaginationComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly currentPage = input<number>(1);
  readonly totalPages = input<number>(1);
  readonly siblingCount = input<number>(1);
  readonly ariaLabel = input<string>("Pagination");
  readonly customClass = input<string>("");

  readonly pageChange = output<number>();

  readonly paginationClass = computed(() =>
    ["dd-pagination", this.customClass()].filter(Boolean).join(" "),
  );

  readonly pages = computed<DdPaginationPage[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const siblings = this.siblingCount();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => ({
        type: "page" as const,
        value: i + 1,
      }));
    }

    const pages: DdPaginationPage[] = [];
    const leftBound = Math.max(2, current - siblings);
    const rightBound = Math.min(total - 1, current + siblings);

    pages.push({ type: "page", value: 1 });

    if (leftBound > 2) {
      pages.push({ type: "ellipsis", value: -1 });
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push({ type: "page", value: i });
    }

    if (rightBound < total - 1) {
      pages.push({ type: "ellipsis", value: -2 });
    }

    pages.push({ type: "page", value: total });

    return pages;
  });

  constructor() {
    this.dynamicStyle.loadStyle("pagination", DD_PAGINATION_CSS);
  }

  goTo(page: number): void {
    const clamped = Math.min(this.totalPages(), Math.max(1, page));
    if (clamped !== this.currentPage()) {
      this.pageChange.emit(clamped);
    }
  }
}
