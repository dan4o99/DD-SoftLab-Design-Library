import { Component, signal } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdPopoverComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-popover-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdPopoverComponent,
    DdButtonComponent,
  ],
  templateUrl: "./popover-page.html",
  styleUrl: "./popover-page.scss",
})
export class PopoverPage {}
