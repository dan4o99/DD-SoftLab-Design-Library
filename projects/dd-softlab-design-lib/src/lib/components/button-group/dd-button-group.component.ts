import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_BUTTON_GROUP_CSS } from "./dd-button-group.style";

@Component({
  selector: "dd-button-group",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="groupClass()" role="group" [attr.aria-label]="ariaLabel()">
      <ng-content />
    </div>
  `,
})
export class DdButtonGroupComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly vertical = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>("Button group");
  readonly customClass = input<string>("");

  readonly groupClass = computed(() =>
    [
      "dd-button-group",
      this.vertical() ? "dd-button-group--vertical" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("button-group", DD_BUTTON_GROUP_CSS);
  }
}
