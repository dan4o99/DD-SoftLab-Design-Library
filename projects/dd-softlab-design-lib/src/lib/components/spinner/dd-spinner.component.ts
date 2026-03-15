import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SPINNER_CSS, DdSpinnerSize } from "./dd-spinner.style";

@Component({
  selector: "dd-spinner",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      [class]="spinnerClass()"
      role="status"
      [attr.aria-label]="ariaLabel()"
    ></span>
  `,
})
export class DdSpinnerComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly size = input<DdSpinnerSize>("medium");
  readonly ariaLabel = input<string>("Loading");
  readonly customClass = input<string>("");

  readonly spinnerClass = computed(() =>
    [
      "dd-spinner",
      this.size() === "small" ? "dd-spinner--sm" : "",
      this.size() === "large" ? "dd-spinner--lg" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("spinner", DD_SPINNER_CSS);
  }
}
