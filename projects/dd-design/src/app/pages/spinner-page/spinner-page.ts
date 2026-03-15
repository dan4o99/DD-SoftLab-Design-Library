import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdSpinnerComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-spinner-page",
  imports: [
    DdCardComponent,
    DdSpinnerComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./spinner-page.html",
  styleUrl: "./spinner-page.scss",
})
export class SpinnerPage {}
