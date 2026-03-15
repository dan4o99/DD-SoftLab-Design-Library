import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdInputComponent,
  DdLabelComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-label-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdLabelComponent,
    DdInputComponent,
  ],
  templateUrl: "./label-page.html",
  styleUrl: "./label-page.scss",
})
export class LabelPage {}
