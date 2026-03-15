import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_QUOTE_CSS } from "./dd-quote.style";

@Component({
  selector: "dd-quote",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <blockquote class="dd-quote">
      <p class="dd-quote__body"><ng-content /></p>
      @if (cite()) {
        <cite class="dd-quote__cite">{{ cite() }}</cite>
      }
    </blockquote>
  `,
})
export class DdQuoteComponent implements OnInit {
  readonly cite = input<string>("");

  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-quote", DD_QUOTE_CSS);
  }
}
