import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_TOOLTIP_CSS, DdTooltipPosition } from "./dd-tooltip.style";

@Component({
  selector: "dd-tooltip",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "dd-tooltip-host",
    "(mouseenter)": "show()",
    "(mouseleave)": "hide()",
    "(focus)": "show()",
    "(blur)": "hide()",
  },
  template: `
    <ng-content />
    @if (visible()) {
      <span [class]="tooltipClass()" role="tooltip">{{ text() }}</span>
    }
  `,
})
export class DdTooltipComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly text = input.required<string>();
  readonly position = input<DdTooltipPosition>("top");
  readonly customClass = input<string>("");

  readonly visible = signal(false);

  readonly tooltipClass = computed(() =>
    ["dd-tooltip", `dd-tooltip--${this.position()}`, this.customClass()]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("tooltip", DD_TOOLTIP_CSS);
  }

  show(): void {
    this.visible.set(true);
  }

  hide(): void {
    this.visible.set(false);
  }
}
