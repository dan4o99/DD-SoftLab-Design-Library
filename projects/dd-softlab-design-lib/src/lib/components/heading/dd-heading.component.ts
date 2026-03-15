import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_HEADING_CSS, DdHeadingLevel } from "./dd-heading.style";

@Component({
  selector: "dd-heading",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (level()) {
      @case (1) {
        <h1 [class]="headingClass()"><ng-content /></h1>
      }
      @case (2) {
        <h2 [class]="headingClass()"><ng-content /></h2>
      }
      @case (3) {
        <h3 [class]="headingClass()"><ng-content /></h3>
      }
      @case (4) {
        <h4 [class]="headingClass()"><ng-content /></h4>
      }
      @case (5) {
        <h5 [class]="headingClass()"><ng-content /></h5>
      }
      @default {
        <h6 [class]="headingClass()"><ng-content /></h6>
      }
    }
  `,
})
export class DdHeadingComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly level = input<DdHeadingLevel>(2);
  readonly muted = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");

  readonly headingClass = computed(() =>
    [
      "dd-heading",
      `dd-heading--${this.level()}`,
      this.muted() ? "dd-heading--muted" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("heading", DD_HEADING_CSS);
  }
}
