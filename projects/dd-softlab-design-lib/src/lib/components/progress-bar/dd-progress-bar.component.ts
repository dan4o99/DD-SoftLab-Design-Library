import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import {
  DD_PROGRESS_BAR_CSS,
  DdProgressBarVariant,
} from "./dd-progress-bar.style";

@Component({
  selector: "dd-progress-bar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="barClass()"
      role="progressbar"
      [attr.aria-valuenow]="clampedValue()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="100"
      [attr.aria-label]="ariaLabel()"
    >
      <div class="dd-progress-bar__fill" [style.width.%]="clampedValue()"></div>
    </div>
  `,
})
export class DdProgressBarComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly value = input<number>(0);
  readonly variant = input<DdProgressBarVariant>("primary");
  readonly size = input<"small" | "medium" | "large">("medium");
  readonly ariaLabel = input<string>("Progress");
  readonly customClass = input<string>("");

  readonly clampedValue = computed(() =>
    Math.min(100, Math.max(0, this.value())),
  );

  readonly barClass = computed(() =>
    [
      "dd-progress-bar",
      this.variant() !== "primary" ? `dd-progress-bar--${this.variant()}` : "",
      this.size() === "small" ? "dd-progress-bar--sm" : "",
      this.size() === "large" ? "dd-progress-bar--lg" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("progress-bar", DD_PROGRESS_BAR_CSS);
  }
}
