import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdCheckboxComponent,
  DdFieldsetComponent,
  DdRadioComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-fieldset-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdFieldsetComponent,
    DdCheckboxComponent,
    DdRadioComponent,
  ],
  templateUrl: "./fieldset-page.html",
  styleUrl: "./fieldset-page.scss",
})
export class FieldsetPage {}
