import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_EMPTY_STATE_CSS } from "./dd-empty-state.style";

@Component({
  selector: "dd-empty-state",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClass()">
      @if (icon()) {
        <span class="dd-empty-state__icon" aria-hidden="true">{{
          icon()
        }}</span>
      }
      <h3 class="dd-empty-state__title">{{ title() }}</h3>
      @if (description()) {
        <p class="dd-empty-state__description">{{ description() }}</p>
      }
      <div class="dd-empty-state__actions">
        <ng-content />
      </div>
    </div>
  `,
})
export class DdEmptyStateComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly title = input<string>("Nothing here yet");
  readonly description = input<string>("");
  readonly icon = input<string>("");
  readonly customClass = input<string>("");

  readonly containerClass = computed(() =>
    ["dd-empty-state", this.customClass()].filter(Boolean).join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("empty-state", DD_EMPTY_STATE_CSS);
  }
}
