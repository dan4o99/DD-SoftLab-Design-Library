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
import { DD_DRAWER_CSS, DdDrawerPlacement } from "./dd-drawer.style";

@Component({
  selector: "dd-drawer",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div
        class="dd-drawer-backdrop"
        (click)="onBackdropClick()"
        (keydown.escape)="onClose()"
      ></div>
      <div
        [class]="drawerClass()"
        role="dialog"
        [attr.aria-modal]="true"
        [attr.aria-label]="ariaLabel()"
      >
        <div class="dd-drawer__header">
          <h2 class="dd-drawer__title">
            <ng-content select="[drawer-title]" />
          </h2>
          @if (!hideClose()) {
            <button
              class="dd-drawer__close"
              type="button"
              aria-label="Close drawer"
              (click)="onClose()"
            >
              ×
            </button>
          }
        </div>
        <div class="dd-drawer__body">
          <ng-content />
        </div>
      </div>
    }
  `,
})
export class DdDrawerComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly open = input(false, { transform: booleanAttribute });
  readonly placement = input<DdDrawerPlacement>("right");
  readonly hideClose = input(false, { transform: booleanAttribute });
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  readonly ariaLabel = input<string>("Drawer");
  readonly customClass = input<string>("");

  readonly closed = output<void>();

  readonly drawerClass = computed(() =>
    ["dd-drawer", `dd-drawer--${this.placement()}`, this.customClass()]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("drawer", DD_DRAWER_CSS);
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.onClose();
    }
  }

  onClose(): void {
    this.closed.emit();
  }
}
