import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_LABEL_CSS } from "./dd-label.style";

@Component({
  selector: "dd-label",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="labelClass()" [attr.for]="for()">
      <ng-content />
    </label>
  `,
})
export class DdLabelComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly for = input<string>("");
  readonly required = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");

  readonly labelClass = computed(() =>
    [
      "dd-label",
      this.required() ? "dd-label--required" : "",
      this.disabled() ? "dd-label--disabled" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("label", DD_LABEL_CSS);
  }
}
