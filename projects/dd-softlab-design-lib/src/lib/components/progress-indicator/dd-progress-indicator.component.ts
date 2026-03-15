import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_PROGRESS_INDICATOR_CSS } from "./dd-progress-indicator.style";

export interface DdProgressStep {
  label: string;
}

@Component({
  selector: "dd-progress-indicator",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol [class]="containerClass()" [attr.aria-label]="ariaLabel()">
      @for (
        step of steps();
        track step.label;
        let i = $index;
        let last = $last
      ) {
        <li
          class="dd-progress-indicator__step"
          [class.dd-progress-indicator__step--active]="i === currentStep()"
          [class.dd-progress-indicator__step--complete]="i < currentStep()"
          [attr.aria-current]="i === currentStep() ? 'step' : null"
        >
          <div class="dd-progress-indicator__step-head">
            @if (i > 0) {
              <div
                class="dd-progress-indicator__connector"
                [class.dd-progress-indicator__connector--complete]="
                  i <= currentStep()
                "
              ></div>
            }
            <div class="dd-progress-indicator__circle">
              @if (i < currentStep()) {
                ✓
              } @else {
                {{ i + 1 }}
              }
            </div>
          </div>
          <span class="dd-progress-indicator__label">{{ step.label }}</span>
        </li>
      }
    </ol>
  `,
})
export class DdProgressIndicatorComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly steps = input<DdProgressStep[]>([]);
  readonly currentStep = input<number>(0);
  readonly ariaLabel = input<string>("Progress");
  readonly customClass = input<string>("");

  readonly containerClass = computed(() =>
    ["dd-progress-indicator", this.customClass()].filter(Boolean).join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle(
      "progress-indicator",
      DD_PROGRESS_INDICATOR_CSS,
    );
  }
}
