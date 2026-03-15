import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  OnInit,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SEGMENTED_CONTROL_CSS } from "./dd-segmented-control.style";

export interface DdSegmentedControlOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: "dd-segmented-control",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="dd-segmented-control"
      role="group"
      [attr.aria-label]="ariaLabel()"
    >
      @for (opt of options(); track opt.value) {
        <button
          type="button"
          class="dd-segmented-control__option"
          [class.dd-segmented-control__option--active]="value() === opt.value"
          [disabled]="opt.disabled ? true : null"
          [attr.aria-pressed]="value() === opt.value"
          (click)="select(opt.value)"
        >
          {{ opt.label }}
        </button>
      }
    </div>
  `,
})
export class DdSegmentedControlComponent implements OnInit {
  readonly options = input<DdSegmentedControlOption[]>([]);
  readonly value = model<string>("");
  readonly ariaLabel = input<string>("Options");

  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle(
      "dd-segmented-control",
      DD_SEGMENTED_CONTROL_CSS,
    );
  }

  protected select(val: string): void {
    this.value.set(val);
  }
}
