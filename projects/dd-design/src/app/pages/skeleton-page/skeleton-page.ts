import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdSkeletonComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-skeleton-page",
  imports: [
    DdCardComponent,
    DdSkeletonComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./skeleton-page.html",
  styleUrl: "./skeleton-page.scss",
})
export class SkeletonPage {}
