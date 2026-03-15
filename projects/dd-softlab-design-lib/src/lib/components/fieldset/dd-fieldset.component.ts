import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_FIELDSET_CSS } from "./dd-fieldset.style";

@Component({
  selector: "dd-fieldset",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset [class]="fieldsetClass()" [disabled]="disabled()">
      @if (legend()) {
        <legend class="dd-fieldset__legend">{{ legend() }}</legend>
      }
      <ng-content />
    </fieldset>
  `,
})
export class DdFieldsetComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly legend = input<string>("");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");

  readonly fieldsetClass = computed(() =>
    [
      "dd-fieldset",
      this.disabled() ? "dd-fieldset--disabled" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("fieldset", DD_FIELDSET_CSS);
  }
}
