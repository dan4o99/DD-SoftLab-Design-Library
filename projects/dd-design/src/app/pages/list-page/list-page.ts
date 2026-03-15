import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdListComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-list-page",
  imports: [DdCardComponent, DdTabComponent, DdTabsComponent, DdListComponent],
  templateUrl: "./list-page.html",
  styleUrl: "./list-page.scss",
})
export class ListPage {}
