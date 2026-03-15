import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_BREADCRUMBS_CSS } from "./dd-breadcrumbs.style";

export interface DdBreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: "dd-breadcrumbs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [attr.aria-label]="ariaLabel()">
      <ol [class]="breadcrumbsClass()">
        @for (item of items(); track item.label; let last = $last) {
          <li>
            @if (!last && item.url) {
              <a [href]="item.url">{{ item.label }}</a>
            } @else {
              <span [attr.aria-current]="last ? 'page' : null">{{
                item.label
              }}</span>
            }
            @if (!last) {
              <span class="dd-breadcrumbs__separator" aria-hidden="true">{{
                separator()
              }}</span>
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class DdBreadcrumbsComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);

  readonly items = input<DdBreadcrumbItem[]>([]);
  readonly separator = input<string>("/");
  readonly ariaLabel = input<string>("Breadcrumb");
  readonly customClass = input<string>("");

  readonly breadcrumbsClass = computed(() =>
    ["dd-breadcrumbs", this.customClass()].filter(Boolean).join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("breadcrumbs", DD_BREADCRUMBS_CSS);
  }
}
