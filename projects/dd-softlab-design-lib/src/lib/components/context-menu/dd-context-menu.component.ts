import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_CONTEXT_MENU_CSS } from "./dd-context-menu.style";

export interface DdContextMenuItem {
  label: string;
  icon?: string;
  value: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: never;
}

export interface DdContextMenuSeparator {
  separator: true;
  value?: never;
}

export type DdContextMenuEntry = DdContextMenuItem | DdContextMenuSeparator;

@Component({
  selector: "dd-context-menu",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:click)": "onDocumentClick($event)",
    "(keydown.escape)": "close()",
  },
  template: `
    <div class="dd-context-menu">
      <div (click)="toggle(); $event.stopPropagation()">
        <ng-content select="[dropdown-trigger]" />
      </div>
      @if (open()) {
        <div
          class="dd-context-menu__panel"
          [class.dd-context-menu__panel--right]="align() === 'right'"
          role="menu"
        >
          @for (entry of items(); track $index) {
            @if (entry.separator) {
              <div class="dd-context-menu__separator" role="separator"></div>
            } @else {
              <button
                type="button"
                class="dd-context-menu__item"
                [class.dd-context-menu__item--danger]="entry.danger"
                [disabled]="entry.disabled ? true : null"
                role="menuitem"
                (click)="onItemClick(entry)"
              >
                @if (entry.icon) {
                  <span aria-hidden="true">{{ entry.icon }}</span>
                }
                {{ entry.label }}
              </button>
            }
          }
        </div>
      }
    </div>
  `,
})
export class DdContextMenuComponent implements OnInit {
  readonly items = input<DdContextMenuEntry[]>([]);
  readonly align = input<"left" | "right">("left");

  readonly itemSelected = output<string>();

  protected readonly open = signal(false);

  private readonly styleService = inject(DdDynamicStyleService);
  private readonly elRef = inject(ElementRef);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-context-menu", DD_CONTEXT_MENU_CSS);
  }

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected close(): void {
    this.open.set(false);
  }

  protected onItemClick(item: DdContextMenuEntry): void {
    if (!item.separator && !(item as DdContextMenuItem).disabled) {
      this.itemSelected.emit((item as DdContextMenuItem).value);
      this.close();
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.elRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }
}
