import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  OnInit,
  output,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SEARCH_INPUT_CSS } from "./dd-search-input.style";

@Component({
  selector: "dd-search-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dd-search-input">
      <span class="dd-search-input__icon" aria-hidden="true">🔍</span>
      <input
        type="search"
        class="dd-search-input__field"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="value()"
        [attr.aria-label]="ariaLabel() || placeholder()"
        (input)="onInput($event)"
        (keydown.escape)="onClear()"
      />
      @if (value()) {
        <button
          type="button"
          class="dd-search-input__clear"
          aria-label="Clear search"
          (click)="onClear()"
        >
          ✕
        </button>
      }
    </div>
  `,
})
export class DdSearchInputComponent implements OnInit {
  readonly value = model<string>("");
  readonly placeholder = input<string>("Search…");
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string>("");

  readonly searched = output<string>();
  readonly cleared = output<void>();

  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-search-input", DD_SEARCH_INPUT_CSS);
  }

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
    this.searched.emit(this.value());
  }

  protected onClear(): void {
    this.value.set("");
    this.cleared.emit();
  }
}
