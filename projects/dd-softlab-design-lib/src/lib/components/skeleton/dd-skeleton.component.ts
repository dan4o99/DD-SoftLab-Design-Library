import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SKELETON_CSS } from "./dd-skeleton.style";

export type DdSkeletonVariant = "rectangle" | "circle" | "text";

@Component({
  selector: "dd-skeleton",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      [class]="skeletonClass()"
      [style.width]="width()"
      [style.height]="height()"
      aria-hidden="true"
    ></span>
  `,
})
export class DdSkeletonComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly variant = input<DdSkeletonVariant>("rectangle");
  readonly width = input<string>("100%");
  readonly height = input<string>("1rem");
  readonly customClass = input<string>("");

  readonly skeletonClass = computed(() =>
    [
      "dd-skeleton",
      this.variant() === "circle" ? "dd-skeleton--circle" : "",
      this.variant() === "text" ? "dd-skeleton--text" : "",
      this.customClass(),
    ]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("skeleton", DD_SKELETON_CSS);
  }
}
