import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdSkipLinkComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-skip-link-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdSkipLinkComponent,
  ],
  templateUrl: "./skip-link-page.html",
  styleUrl: "./skip-link-page.scss",
})
export class SkipLinkPage {}
