import { DOCUMENT } from "@angular/common";
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SIDEBAR_CSS } from "./dd-sidebar.style";

@Component({
  selector: "dd-sidebar",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside
      [class]="sidebarClass()"
      [attr.style]="sidebarStyle()"
      [attr.aria-label]="ariaLabel()"
      (click)="onClick($event)"
    >
      <button
        class="dd-sidebar__resizer"
        type="button"
        [attr.aria-label]="resizerLabel()"
        [attr.aria-expanded]="!isCollapsed()"
        (pointerdown)="onResizerPointerDown($event)"
      >
        <span class="dd-sidebar__resizer-handle" aria-hidden="true">||</span>
      </button>
      <div class="dd-sidebar__header">
        <ng-content select="[sidebar-header]" />
      </div>
      <nav class="dd-sidebar__content">
        <ng-content />
      </nav>
      @if (collapsable()) {
        <div class="dd-sidebar__footer">
          <button
            class="dd-sidebar__collapse-icon"
            type="button"
            [attr.aria-label]="
              isCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'
            "
            (click)="onCollapseToggle($event)"
          >
            {{ isCollapsed() ? ">" : "<" }}
          </button>
        </div>
      }
    </aside>
  `,
})
export class DdSidebarComponent implements OnDestroy {
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly document = inject(DOCUMENT);
  // Tracks the currently rendered width in pixels.
  private readonly currentWidth = signal(288);
  // Internal collapsed state to keep UI responsive to interactions.
  private readonly internalCollapsed = signal(false);
  // Prevents input effects from overriding during drag.
  private readonly isDragging = signal(false);
  // Last non-collapsed width for restoring after expanding.
  private lastExpandedWidth = 288;
  private removeDragListeners: (() => void) | null = null;

  readonly ariaLabel = input<string>("Sidebar");
  readonly resizerLabel = input<string>("Resize sidebar");
  readonly width = input<number>(288);
  readonly minWidth = input<number>(80);
  readonly maxWidth = input<number>(520);
  readonly collapsedWidth = input<number>(80);
  readonly collapsed = input(false, { transform: booleanAttribute });
  readonly collapsable = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly clicked = output<MouseEvent>();
  readonly collapsedChange = output<boolean>();
  readonly widthChange = output<number>();

  readonly isCollapsed = computed(() => this.internalCollapsed());

  readonly sidebarClass = computed(() =>
    ["dd-sidebar", ...this.normalizedCustomClass()].join(" "),
  );

  readonly sidebarStyle = computed(() =>
    this.composeStyle(this.customStyle(), this.currentWidth(), this.maxWidth()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("sidebar", DD_SIDEBAR_CSS);
    this.currentWidth.set(this.width());
    this.lastExpandedWidth = this.width();
    this.internalCollapsed.set(this.collapsed());

    // Sync external width input when not dragging or collapsed.
    effect(() => {
      if (this.isDragging() || this.isCollapsed()) {
        return;
      }

      const width = this.width();
      this.currentWidth.set(width);
      this.lastExpandedWidth = width;
    });

    // Sync external collapsed input when not dragging.
    effect(() => {
      if (this.isDragging()) {
        return;
      }

      this.setCollapsed(this.collapsed());
    });

    // Ensure collapsed state forces the collapsed width.
    effect(() => {
      if (!this.isCollapsed()) {
        return;
      }

      this.currentWidth.set(this.collapsedWidth());
    });
  }

  ngOnDestroy(): void {
    this.detachDragListeners();
  }

  // Bubble click events from the sidebar container.
  onClick(event: MouseEvent): void {
    this.clicked.emit(event);
  }

  // Begin a drag resize operation from the resizer control.
  onResizerPointerDown(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    event.stopPropagation();

    if (this.isCollapsed()) {
      this.setCollapsed(false);
      this.collapsedChange.emit(false);
    }

    const startX = event.clientX;
    const startWidth = this.currentWidth();

    this.isDragging.set(true);

    // Track pointer movement and emit width changes.
    const onMove = (moveEvent: PointerEvent): void => {
      const delta = moveEvent.clientX - startX;
      const nextWidth = this.clampWidth(startWidth + delta);
      this.currentWidth.set(nextWidth);
      this.widthChange.emit(nextWidth);
    };

    // Finalize drag state and store the latest width.
    const onUp = (): void => {
      this.isDragging.set(false);
      this.lastExpandedWidth = this.currentWidth();
      this.detachDragListeners();
    };

    this.attachDragListeners(onMove, onUp);
  }

  onCollapseToggle(event: MouseEvent): void {
    event.stopPropagation();

    const nextCollapsed = !this.isCollapsed();
    this.setCollapsed(nextCollapsed);
    this.collapsedChange.emit(nextCollapsed);
  }

  private normalizedCustomClass(): string[] {
    const value = this.customClass().trim();
    return value ? value.split(/\s+/) : [];
  }

  // Apply or clear collapsed state and keep width in sync.
  private setCollapsed(collapsed: boolean): void {
    this.internalCollapsed.set(collapsed);

    if (collapsed) {
      this.lastExpandedWidth = this.currentWidth();
      this.currentWidth.set(this.collapsedWidth());
      return;
    }

    this.currentWidth.set(this.lastExpandedWidth || this.width());
  }

  // Enforce width bounds based on min/max inputs.
  private clampWidth(width: number): number {
    const min = this.minWidth();
    const max = this.maxWidth();
    return Math.min(Math.max(width, min), max);
  }

  // Attach drag listeners on the document so resizing works outside the sidebar.
  private attachDragListeners(
    onMove: (event: PointerEvent) => void,
    onUp: () => void,
  ): void {
    const moveListener = (event: Event): void => {
      onMove(event as PointerEvent);
    };

    const upListener = (): void => {
      onUp();
    };

    this.document.addEventListener("pointermove", moveListener);
    this.document.addEventListener("pointerup", upListener, { once: true });

    this.removeDragListeners = (): void => {
      this.document.removeEventListener("pointermove", moveListener);
      this.document.removeEventListener("pointerup", upListener);
    };
  }

  // Remove any drag listeners that were registered during resizing.
  private detachDragListeners(): void {
    this.removeDragListeners?.();
    this.removeDragListeners = null;
  }

  // Merge sizing with any custom styles provided to the component.
  private composeStyle(
    style: string | Record<string, string | number> | null,
    width: number,
    maxWidth: number,
  ): string | null {
    const normalizedStyle = this.normalizeStyleValue(style);
    const sizing = `width: ${width}px; min-width: ${this.minWidth()}px; max-width: ${maxWidth}px;`;

    if (!normalizedStyle) {
      return sizing;
    }

    return `${normalizedStyle} ${sizing}`.trim();
  }

  // Normalize inline style inputs to a safe string representation.
  private normalizeStyleValue(
    style: string | Record<string, string | number> | null,
  ): string | null {
    if (!style) {
      return null;
    }

    if (typeof style === "string") {
      const normalized = style.trim();
      return normalized.length > 0 ? normalized : null;
    }

    const entries = Object.entries(style)
      .filter(([, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}: ${value};`);

    return entries.length > 0 ? entries.join(" ") : null;
  }
}
