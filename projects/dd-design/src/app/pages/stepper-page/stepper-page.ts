import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdStepperComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-stepper-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdStepperComponent,
  ],
  templateUrl: "./stepper-page.html",
  styleUrl: "./stepper-page.scss",
})
export class StepperPage {
  readonly count = signal(1);
  readonly quantity = signal(0);
}
