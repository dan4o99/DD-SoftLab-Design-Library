import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdRatingComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-rating-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdRatingComponent,
  ],
  templateUrl: "./rating-page.html",
  styleUrl: "./rating-page.scss",
})
export class RatingPage {
  readonly rating = signal(3);
}
