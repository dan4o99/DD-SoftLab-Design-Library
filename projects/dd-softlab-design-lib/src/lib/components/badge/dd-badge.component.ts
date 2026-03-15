import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_BADGE_CSS, DdBadgeVariant } from "./dd-badge.style";

@Component({
  selector: "dd-badge",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="badgeClass()">
      <ng-content />
    </span>
  `,
})
export class DdBadgeComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly variant = input<DdBadgeVariant>("default");
  readonly customClass = input<string>("");

  readonly badgeClass = computed(() =>
    [
      "dd-badge",
      this.variant() !== "default" ? `dd-badge--${this.variant()}` : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("badge", DD_BADGE_CSS);
  }
}
