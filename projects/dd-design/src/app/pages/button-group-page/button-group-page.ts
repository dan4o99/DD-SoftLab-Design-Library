import { Component } from "@angular/core";
import {
  DdButtonComponent,
  DdButtonGroupComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-button-group-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdButtonGroupComponent,
    DdButtonComponent,
  ],
  templateUrl: "./button-group-page.html",
  styleUrl: "./button-group-page.scss",
})
export class ButtonGroupPage {}
