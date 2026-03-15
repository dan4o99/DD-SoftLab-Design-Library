import { Component } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
  DdTooltipComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-tooltip-page",
  imports: [
    DdButtonComponent,
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdTooltipComponent,
  ],
  templateUrl: "./tooltip-page.html",
  styleUrl: "./tooltip-page.scss",
})
export class TooltipPage {}
