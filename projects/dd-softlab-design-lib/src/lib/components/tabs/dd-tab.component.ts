import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
  ViewChild,
} from "@angular/core";

/**
 * Individual tab panel used inside `<dd-tabs>`.
 *
 * Usage:
 * ```html
 * <dd-tab id="settings" label="Settings" [disabled]="false">
 *   <p>Any projected content goes here.</p>
 * </dd-tab>
 * ```
 *
 * The component captures its projected content via a `<ng-template>`
 * so the parent `DdTabsComponent` can render only the active panel.
 */
@Component({
  selector: "dd-tab",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
})
export class DdTabComponent {
  /** Unique identifier for this tab. */
  readonly id = input.required<string>();

  /** Label displayed in the tab header button. */
  readonly label = input.required<string>();

  /** Whether this tab is disabled and cannot be selected. */
  readonly disabled = input(false, { transform: booleanAttribute });

  /** Reference to the content template, read by the parent DdTabsComponent. */
  @ViewChild("contentTemplate", { static: true })
  contentTemplate!: TemplateRef<unknown>;
}
