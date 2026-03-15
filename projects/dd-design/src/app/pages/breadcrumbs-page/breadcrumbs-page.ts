import { Component } from "@angular/core";
import {
  DdBreadcrumbsComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-breadcrumbs-page",
  imports: [
    DdBreadcrumbsComponent,
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./breadcrumbs-page.html",
  styleUrl: "./breadcrumbs-page.scss",
})
export class BreadcrumbsPage {}
