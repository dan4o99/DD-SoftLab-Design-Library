import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdPaginationComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-pagination-page",
  imports: [
    DdCardComponent,
    DdPaginationComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./pagination-page.html",
  styleUrl: "./pagination-page.scss",
})
export class PaginationPage {
  readonly currentPage = signal(1);

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }
}
