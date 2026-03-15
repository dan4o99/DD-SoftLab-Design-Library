import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdProgressBarComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-progress-bar-page",
  imports: [
    DdCardComponent,
    DdProgressBarComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./progress-bar-page.html",
  styleUrl: "./progress-bar-page.scss",
})
export class ProgressBarPage {}
