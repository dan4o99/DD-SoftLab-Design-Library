import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_CAROUSEL_CSS } from "./dd-carousel.style";

@Component({
  selector: "dd-carousel",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="dd-carousel"
      [attr.aria-roledescription]="'carousel'"
      [attr.aria-label]="ariaLabel()"
    >
      <div
        class="dd-carousel__track"
        [style.transform]="'translateX(' + -currentIndex() * 100 + '%)'"
      >
        <ng-content />
      </div>
      <div class="dd-carousel__controls">
        <button
          class="dd-carousel__btn"
          type="button"
          aria-label="Previous slide"
          [disabled]="!loop() && currentIndex() === 0"
          (click)="prev()"
        >
          &lsaquo;
        </button>
        <div class="dd-carousel__dots" role="tablist">
          @for (i of indices(); track i) {
            <button
              class="dd-carousel__dot"
              [class.dd-carousel__dot--active]="i === currentIndex()"
              role="tab"
              [attr.aria-selected]="i === currentIndex()"
              [attr.aria-label]="'Slide ' + (i + 1)"
              (click)="goTo(i)"
            ></button>
          }
        </div>
        <button
          class="dd-carousel__btn"
          type="button"
          aria-label="Next slide"
          [disabled]="!loop() && currentIndex() === count() - 1"
          (click)="next()"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  `,
})
export class DdCarouselComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly count = input<number>(0);
  readonly loop = input<boolean>(false);
  readonly ariaLabel = input<string>("Image carousel");
  readonly customClass = input<string>("");

  readonly slideChange = output<number>();

  readonly currentIndex = signal(0);
  readonly indices = computed(() =>
    Array.from({ length: this.count() }, (_, i) => i),
  );

  constructor() {
    this.dynamicStyle.loadStyle("carousel", DD_CAROUSEL_CSS);
  }

  prev(): void {
    const idx = this.currentIndex();
    const n = this.count();
    if (idx > 0) {
      this.goTo(idx - 1);
    } else if (this.loop()) {
      this.goTo(n - 1);
    }
  }

  next(): void {
    const idx = this.currentIndex();
    const n = this.count();
    if (idx < n - 1) {
      this.goTo(idx + 1);
    } else if (this.loop()) {
      this.goTo(0);
    }
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.slideChange.emit(index);
  }
}
