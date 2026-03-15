import { Component } from "@angular/core";
import {
  DdBadgeComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-badge-page",
  imports: [DdBadgeComponent, DdCardComponent, DdTabComponent, DdTabsComponent],
  templateUrl: "./badge-page.html",
  styleUrl: "./badge-page.scss",
})
export class BadgePage {}
