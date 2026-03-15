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
import { DD_STEPPER_CSS } from "./dd-stepper.style";

@Component({
  selector: "dd-stepper",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dd-stepper" role="group" [attr.aria-label]="ariaLabel()">
      <button
        type="button"
        class="dd-stepper__btn"
        aria-label="Decrease"
        [disabled]="value() <= min() ? true : null"
        (click)="decrement()"
      >
        −
      </button>
      <input
        type="number"
        class="dd-stepper__value"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        [attr.aria-label]="ariaLabel()"
        (change)="onInputChange($event)"
      />
      <button
        type="button"
        class="dd-stepper__btn"
        aria-label="Increase"
        [disabled]="value() >= max() ? true : null"
        (click)="increment()"
      >
        +
      </button>
    </div>
  `,
})
export class DdStepperComponent implements OnInit {
  readonly value = model<number>(0);
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly step = input<number>(1);
  readonly ariaLabel = input<string>("Numeric stepper");

  readonly valueChange = output<number>();

  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-stepper", DD_STEPPER_CSS);
  }

  protected increment(): void {
    const next = Math.min(this.value() + this.step(), this.max());
    this.value.set(next);
    this.valueChange.emit(next);
  }

  protected decrement(): void {
    const next = Math.max(this.value() - this.step(), this.min());
    this.value.set(next);
    this.valueChange.emit(next);
  }

  protected onInputChange(event: Event): void {
    const raw = Number((event.target as HTMLInputElement).value);
    const clamped = Math.min(Math.max(raw, this.min()), this.max());
    this.value.set(clamped);
    this.valueChange.emit(clamped);
  }
}
