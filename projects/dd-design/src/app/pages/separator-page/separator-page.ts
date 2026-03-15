import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdSeparatorComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-separator-page",
  imports: [
    DdCardComponent,
    DdSeparatorComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./separator-page.html",
  styleUrl: "./separator-page.scss",
})
export class SeparatorPage {}
