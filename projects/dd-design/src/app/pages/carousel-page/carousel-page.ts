import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdCarouselComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-carousel-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdCarouselComponent,
  ],
  templateUrl: "./carousel-page.html",
  styleUrl: "./carousel-page.scss",
})
export class CarouselPage {
  readonly currentSlide = signal(0);

  onSlideChange(i: number): void {
    this.currentSlide.set(i);
  }
}
