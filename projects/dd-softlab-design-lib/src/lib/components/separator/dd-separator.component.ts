import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SEPARATOR_CSS, DdSeparatorOrientation } from "./dd-separator.style";

@Component({
  selector: "dd-separator",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hr
      [class]="separatorClass()"
      role="separator"
      [attr.aria-orientation]="orientation()"
    />
  `,
})
export class DdSeparatorComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly orientation = input<DdSeparatorOrientation>("horizontal");
  readonly customClass = input<string>("");

  readonly separatorClass = computed(() =>
    [
      "dd-separator",
      this.orientation() === "vertical" ? "dd-separator--vertical" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("separator", DD_SEPARATOR_CSS);
  }
}
