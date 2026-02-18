import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_TABS_CSS } from "./dd-tabs.style";
import { DdTabComponent } from "./dd-tab.component";

/**
 * Tabs container that renders header buttons from child `<dd-tab>` components
 * and displays only the active tab's projected content via NgTemplateOutlet.
 *
 * Usage:
 * ```html
 * <dd-tabs (changed)="onTabChange($event)">
 *   <dd-tab id="overview" label="Overview">
 *     <p>Any Angular content here.</p>
 *   </dd-tab>
 *   <dd-tab id="settings" label="Settings" disabled>
 *     <my-settings-form />
 *   </dd-tab>
 * </dd-tabs>
 * ```
 */
@Component({
  selector: "dd-tabs",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: `
    <div [class]="wrapperClass()" [attr.style]="wrapperStyle()">
      <div
        class="dd-tabs__header"
        role="tablist"
        [attr.aria-label]="ariaLabel()"
      >
        @for (tab of tabChildren(); track tab.id()) {
          <button
            type="button"
            role="tab"
            class="dd-tabs__tab"
            [class.dd-tabs__tab--active]="currentActiveTab() === tab.id()"
            [disabled]="tab.disabled()"
            [attr.aria-selected]="currentActiveTab() === tab.id()"
            [attr.aria-controls]="'panel-' + tab.id()"
            (click)="selectTab(tab.id())"
          >
            {{ tab.label() }}
          </button>
        }
      </div>
      <div class="dd-tabs__content">
        @if (activeTabTemplate(); as tmpl) {
          <div
            class="dd-tabs__panel"
            role="tabpanel"
            [attr.id]="'panel-' + currentActiveTab()"
          >
            <ng-container *ngTemplateOutlet="tmpl" />
          </div>
        }
      </div>
    </div>
  `,
})
export class DdTabsComponent {
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly internalActiveTab = signal<string>("");

  /** Child DdTabComponent instances projected inside this host. */
  readonly tabChildren = contentChildren(DdTabComponent);

  /** Externally set active tab ID; overrides internal selection. */
  readonly activeTab = input<string>("");
  readonly ariaLabel = input<string>("Tabs");
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  /** Emits the tab ID when the active tab changes. */
  readonly changed = output<string>();
  /** Emits the tab ID when a tab button is clicked. */
  readonly clicked = output<string>();

  /** Resolves the currently active tab ID from input, internal state, or first child. */
  readonly currentActiveTab = computed(() => {
    const fromInput = this.activeTab();
    const fromInternal = this.internalActiveTab();
    const active = fromInput || fromInternal;
    return active || this.tabChildren()[0]?.id() || "";
  });

  /** Returns the TemplateRef of the active tab's content for rendering. */
  readonly activeTabTemplate = computed(() => {
    const activeId = this.currentActiveTab();
    const tab = this.tabChildren().find((t) => t.id() === activeId);
    return tab?.contentTemplate ?? null;
  });

  readonly wrapperClass = computed(() =>
    ["dd-tabs", ...this.normalizedCustomClass()].join(" "),
  );

  readonly wrapperStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("tabs", DD_TABS_CSS);
  }

  private normalizedCustomClass(): string[] {
    return this.customClass()
      .split(" ")
      .filter((cls) => cls.trim().length > 0);
  }

  private normalizeStyleValue(
    value: string | Record<string, string | number> | null,
  ): string | null {
    if (!value) return null;
    if (typeof value === "string") return value;
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join("; ");
  }

  /** Selects a tab by its ID and emits changed/clicked events. */
  selectTab(tabId: string): void {
    const tab = this.tabChildren().find((t) => t.id() === tabId);
    if (tab && !tab.disabled()) {
      this.internalActiveTab.set(tabId);
      this.changed.emit(tabId);
      this.clicked.emit(tabId);
    }
  }
}
