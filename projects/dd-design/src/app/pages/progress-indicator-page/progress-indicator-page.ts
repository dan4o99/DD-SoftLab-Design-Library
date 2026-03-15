import { Component, signal } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdProgressIndicatorComponent,
  DdProgressStep,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-progress-indicator-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdProgressIndicatorComponent,
    DdButtonComponent,
  ],
  templateUrl: "./progress-indicator-page.html",
  styleUrl: "./progress-indicator-page.scss",
})
export class ProgressIndicatorPage {
  readonly currentStep = signal(1);

  readonly steps: DdProgressStep[] = [
    { label: "Account" },
    { label: "Profile" },
    { label: "Review" },
    { label: "Done" },
  ];

  prev(): void {
    this.currentStep.update((s) => Math.max(0, s - 1));
  }
  next(): void {
    this.currentStep.update((s) => Math.min(this.steps.length, s + 1));
  }
}
