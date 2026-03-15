import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
  DdVisuallyHiddenComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-visually-hidden-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdVisuallyHiddenComponent,
  ],
  templateUrl: "./visually-hidden-page.html",
  styleUrl: "./visually-hidden-page.scss",
})
export class VisuallyHiddenPage {}
