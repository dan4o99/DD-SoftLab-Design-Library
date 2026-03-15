import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdSearchInputComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-search-input-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdSearchInputComponent,
  ],
  templateUrl: "./search-input-page.html",
  styleUrl: "./search-input-page.scss",
})
export class SearchInputPage {
  readonly query = signal("");
}
