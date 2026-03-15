import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_LIST_CSS, DdListVariant } from "./dd-list.style";

@Component({
  selector: "dd-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (variant() === "ordered") {
      <ol [class]="listClass()">
        <ng-content />
      </ol>
    } @else {
      <ul [class]="listClass()">
        <ng-content />
      </ul>
    }
  `,
})
export class DdListComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly variant = input<DdListVariant>("unordered");
  readonly dividers = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");

  readonly listClass = computed(() =>
    [
      "dd-list",
      this.variant() === "none" ? "dd-list--none" : "",
      this.dividers() ? "dd-list--divider" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("list", DD_LIST_CSS);
  }
}
