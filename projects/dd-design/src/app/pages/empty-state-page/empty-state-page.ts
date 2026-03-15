import { Component } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdEmptyStateComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-empty-state-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdEmptyStateComponent,
    DdButtonComponent,
  ],
  templateUrl: "./empty-state-page.html",
  styleUrl: "./empty-state-page.scss",
})
export class EmptyStatePage {}
