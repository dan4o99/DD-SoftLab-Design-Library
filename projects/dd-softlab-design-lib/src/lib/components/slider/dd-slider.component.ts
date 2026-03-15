import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  OnInit,
  output,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SLIDER_CSS } from "./dd-slider.style";

@Component({
  selector: "dd-slider",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dd-slider">
      <input
        type="range"
        class="dd-slider__input"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-valuemin]="min()"
        [attr.aria-valuemax]="max()"
        [attr.aria-valuenow]="value()"
        (input)="onInput($event)"
      />
      @if (showLabels()) {
        <div class="dd-slider__labels">
          <span>{{ min() }}</span>
          <span>{{ value() }}</span>
          <span>{{ max() }}</span>
        </div>
      }
    </div>
  `,
})
export class DdSliderComponent implements OnInit {
  readonly value = model<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly disabled = input<boolean>(false);
  readonly showLabels = input<boolean>(false);
  readonly ariaLabel = input<string>("Slider");

  readonly valueChange = output<number>();

  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-slider", DD_SLIDER_CSS);
  }

  protected onInput(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.value.set(val);
    this.valueChange.emit(val);
  }
}
