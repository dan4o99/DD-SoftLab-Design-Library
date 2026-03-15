import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SKIP_LINK_CSS } from "./dd-skip-link.style";

@Component({
  selector: "dd-skip-link",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="dd-skip-link" [href]="'#' + target()">{{ label() }}</a>
  `,
})
export class DdSkipLinkComponent implements OnInit {
  readonly target = input<string>("main-content");
  readonly label = input<string>("Skip to main content");

  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-skip-link", DD_SKIP_LINK_CSS);
  }
}
