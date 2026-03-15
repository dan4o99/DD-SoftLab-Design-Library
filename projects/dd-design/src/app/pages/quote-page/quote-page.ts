import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdQuoteComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-quote-page",
  imports: [DdCardComponent, DdTabComponent, DdTabsComponent, DdQuoteComponent],
  templateUrl: "./quote-page.html",
  styleUrl: "./quote-page.scss",
})
export class QuotePage {}
