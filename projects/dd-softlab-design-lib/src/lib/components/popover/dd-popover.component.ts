import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_POPOVER_CSS, DdPopoverPosition } from "./dd-popover.style";

@Component({
  selector: "dd-popover",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "dd-popover-host",
    "(document:click)": "onDocumentClick($event)",
    "(keydown.escape)": "close()",
  },
  template: `
    <span (click)="toggle()">
      <ng-content select="[popover-trigger]" />
    </span>
    @if (open()) {
      <div
        [class]="popoverClass()"
        role="dialog"
        [attr.aria-label]="ariaLabel()"
      >
        @if (title()) {
          <p class="dd-popover__title">{{ title() }}</p>
        }
        <ng-content />
      </div>
    }
  `,
})
export class DdPopoverComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);
  private readonly elementRef = inject(ElementRef);

  readonly position = input<DdPopoverPosition>("bottom");
  readonly title = input<string>("");
  readonly ariaLabel = input<string>("Popover");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");

  readonly openedChange = output<boolean>();
  readonly open = signal(false);

  readonly popoverClass = computed(() =>
    ["dd-popover", `dd-popover--${this.position()}`, this.customClass()]
      .filter(Boolean)
      .join(" "),
  );

  constructor() {
    this.dynamicStyle.loadStyle("popover", DD_POPOVER_CSS);
  }

  toggle(): void {
    if (!this.disabled()) {
      const next = !this.open();
      this.open.set(next);
      this.openedChange.emit(next);
    }
  }

  close(): void {
    if (this.open()) {
      this.open.set(false);
      this.openedChange.emit(false);
    }
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
