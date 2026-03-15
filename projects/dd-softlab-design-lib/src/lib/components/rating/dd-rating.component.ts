import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  OnInit,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_RATING_CSS } from "./dd-rating.style";

@Component({
  selector: "dd-rating",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="dd-rating"
      [class.dd-rating--readonly]="readonly()"
      [attr.aria-label]="'Rating: ' + value() + ' out of ' + max()"
      role="group"
    >
      @for (star of stars(); track $index) {
        <button
          type="button"
          class="dd-rating__star"
          [class.dd-rating__star--filled]="$index < value()"
          [class.dd-rating__star--hovered]="!readonly() && $index < hovered()"
          [attr.aria-label]="'Rate ' + ($index + 1)"
          [disabled]="readonly() ? true : null"
          (click)="onRate($index + 1)"
          (mouseenter)="onHover($index + 1)"
          (mouseleave)="onHover(0)"
          (focus)="onHover($index + 1)"
          (blur)="onHover(0)"
        >
          ★
        </button>
      }
    </div>
  `,
})
export class DdRatingComponent implements OnInit {
  readonly value = model<number>(0);
  readonly max = input<number>(5);
  readonly readonly = input<boolean>(false);

  protected readonly hovered = signal(0);
  protected readonly stars = signal<number[]>([]);

  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-rating", DD_RATING_CSS);
    this.stars.set(Array.from({ length: this.max() }, (_, i) => i));
  }

  protected onRate(index: number): void {
    if (!this.readonly()) this.value.set(index);
  }

  protected onHover(index: number): void {
    if (!this.readonly()) this.hovered.set(index);
  }
}
