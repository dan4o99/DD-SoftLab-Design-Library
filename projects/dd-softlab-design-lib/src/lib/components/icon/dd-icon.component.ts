import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_ICON_CSS, DdIconSize } from "./dd-icon.style";

@Component({
  selector: "dd-icon",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      [class]="iconClass()"
      [attr.aria-label]="ariaLabel() || null"
      [attr.aria-hidden]="ariaLabel() ? null : 'true'"
      [attr.role]="ariaLabel() ? 'img' : null"
    >
      @if (svg()) {
        <span [innerHTML]="safeSvg()"></span>
      } @else {
        <ng-content />
      }
    </span>
  `,
})
export class DdIconComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly svg = input<string>("");
  readonly size = input<DdIconSize>("medium");
  readonly ariaLabel = input<string>("");
  readonly customClass = input<string>("");

  readonly safeSvg = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.svg()),
  );

  readonly iconClass = computed(() =>
    [
      "dd-icon",
      this.size() === "small" ? "dd-icon--sm" : "",
      this.size() === "large" ? "dd-icon--lg" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("icon", DD_ICON_CSS);
  }
}
