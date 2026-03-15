import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { DdToastPosition, DdToastService } from "./dd-toast.service";

@Component({
  selector: "dd-toast-container",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="dd-toast-container"
      [class]="'dd-toast-container--' + position()"
      aria-live="polite"
      aria-atomic="false"
    >
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="dd-toast"
          [class]="'dd-toast--' + toast.variant"
          role="alert"
        >
          <div class="dd-toast__body">
            @if (toast.title) {
              <span class="dd-toast__title">{{ toast.title }}</span>
            }
            <span class="dd-toast__message">{{ toast.message }}</span>
          </div>
          <button
            type="button"
            class="dd-toast__close"
            aria-label="Dismiss"
            (click)="toastService.dismiss(toast.id)"
          >
            ✕
          </button>
        </div>
      }
    </div>
  `,
})
export class DdToastContainerComponent {
  readonly position = input<DdToastPosition>("top-right");
  readonly toastService = inject(DdToastService);
}
