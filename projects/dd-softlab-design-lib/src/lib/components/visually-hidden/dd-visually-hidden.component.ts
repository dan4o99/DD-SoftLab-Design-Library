import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_VISUALLY_HIDDEN_CSS } from "./dd-visually-hidden.style";

@Component({
  selector: "dd-visually-hidden",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="dd-visually-hidden"><ng-content /></span>`,
})
export class DdVisuallyHiddenComponent implements OnInit {
  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-visually-hidden", DD_VISUALLY_HIDDEN_CSS);
  }
}
