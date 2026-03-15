import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdHeadingComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-heading-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdHeadingComponent,
  ],
  templateUrl: "./heading-page.html",
  styleUrl: "./heading-page.scss",
})
export class HeadingPage {}
