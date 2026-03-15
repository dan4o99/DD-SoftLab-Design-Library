import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdSliderComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-slider-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdSliderComponent,
  ],
  templateUrl: "./slider-page.html",
  styleUrl: "./slider-page.scss",
})
export class SliderPage {
  readonly volume = signal(60);
  readonly price = signal(250);
}
