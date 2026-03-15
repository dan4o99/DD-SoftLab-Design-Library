import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_MODAL_CSS } from "./dd-modal.style";

@Component({
  selector: "dd-modal",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div
        class="dd-modal-backdrop"
        (click)="onBackdropClick($event)"
        (keydown.escape)="onClose()"
      >
        <div
          [class]="modalClass()"
          role="dialog"
          [attr.aria-modal]="true"
          [attr.aria-label]="ariaLabel()"
          tabindex="-1"
          (click)="$event.stopPropagation()"
        >
          <div class="dd-modal__header">
            <h2 class="dd-modal__title">
              <ng-content select="[modal-title]" />
            </h2>
            @if (!hideClose()) {
              <button
                class="dd-modal__close"
                type="button"
                aria-label="Close dialog"
                (click)="onClose()"
              >
                ×
              </button>
            }
          </div>
          <div class="dd-modal__body">
            <ng-content />
          </div>
          <div class="dd-modal__footer">
            <ng-content select="[modal-footer]" />
          </div>
        </div>
      </div>
    }
  `,
})
export class DdModalComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly open = input(false, { transform: booleanAttribute });
  readonly hideClose = input(false, { transform: booleanAttribute });
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>("Dialog");
  readonly customClass = input<string>("");

  readonly closed = output<void>();

  readonly modalClass = computed(() =>
    ["dd-modal", this.customClass()].filter(Boolean).join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("modal", DD_MODAL_CSS);
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop() && event.target === event.currentTarget) {
      this.onClose();
    }
  }

  onClose(): void {
    this.closed.emit();
  }
}
