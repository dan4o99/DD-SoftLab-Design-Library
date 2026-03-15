import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_AVATAR_CSS, DdAvatarShape, DdAvatarSize } from "./dd-avatar.style";

@Component({
  selector: "dd-avatar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (src()) {
      <span [class]="avatarClass()" role="img" [attr.aria-label]="ariaLabel()">
        <img [src]="src()" [alt]="ariaLabel()" />
      </span>
    } @else {
      <span [class]="avatarClass()" role="img" [attr.aria-label]="ariaLabel()">
        {{ initials() }}
      </span>
    }
  `,
})
export class DdAvatarComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly src = input<string | null>(null);
  readonly name = input<string>("");
  readonly ariaLabel = input<string>("Avatar");
  readonly size = input<DdAvatarSize>("medium");
  readonly shape = input<DdAvatarShape>("circle");
  readonly customClass = input<string>("");

  readonly initials = computed(() => {
    const n = this.name().trim();
    if (!n) return "?";
    const parts = n.split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : n[0].toUpperCase();
  });

  readonly avatarClass = computed(() =>
    [
      "dd-avatar",
      this.size() === "small" ? "dd-avatar--sm" : "",
      this.size() === "large" ? "dd-avatar--lg" : "",
      this.shape() === "square" ? "dd-avatar--square" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("avatar", DD_AVATAR_CSS);
  }
}
