import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_TREE_VIEW_CSS } from "./dd-tree-view.style";

export interface DdTreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: DdTreeNode[];
}

/** Internal recursive node — not part of public API surface */
@Component({
  selector: "dd-tree-node",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li
      class="dd-tree-view__item"
      role="treeitem"
      [attr.aria-expanded]="node().children?.length ? expanded() : null"
    >
      <div
        class="dd-tree-view__row"
        [class.dd-tree-view__row--selected]="selectedId() === node().id"
        tabindex="0"
        (click)="onRowClick()"
        (keydown.enter)="onRowClick()"
        (keydown.space)="onRowClick(); $event.preventDefault()"
      >
        @if (node().children?.length) {
          <span
            class="dd-tree-view__toggle"
            [class.dd-tree-view__toggle--expanded]="expanded()"
            aria-hidden="true"
            >▶</span
          >
        } @else {
          <span class="dd-tree-view__toggle" aria-hidden="true"></span>
        }
        @if (node().icon) {
          <span class="dd-tree-view__icon" aria-hidden="true">{{
            node().icon
          }}</span>
        }
        <span class="dd-tree-view__label">{{ node().label }}</span>
      </div>
      @if (node().children?.length && expanded()) {
        <ul class="dd-tree-view__list dd-tree-view__list--nested" role="group">
          @for (child of node().children; track child.id) {
            <dd-tree-node
              [node]="child"
              [selectedId]="selectedId()"
              (nodeSelected)="nodeSelected.emit($event)"
            />
          }
        </ul>
      }
    </li>
  `,
})
export class DdTreeNodeComponent {
  readonly node = input.required<DdTreeNode>();
  readonly selectedId = input<string>("");
  readonly nodeSelected = output<string>();

  protected readonly expanded = signal(false);

  protected onRowClick(): void {
    if (this.node().children?.length) {
      this.expanded.update((v) => !v);
    }
    this.nodeSelected.emit(this.node().id);
  }
}

@Component({
  selector: "dd-tree-view",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DdTreeNodeComponent],
  template: `
    <div class="dd-tree-view" role="tree">
      <ul class="dd-tree-view__list">
        @for (node of nodes(); track node.id) {
          <dd-tree-node
            [node]="node"
            [selectedId]="selected()"
            (nodeSelected)="selected.set($event)"
          />
        }
      </ul>
    </div>
  `,
})
export class DdTreeViewComponent implements OnInit {
  readonly nodes = input<DdTreeNode[]>([]);
  readonly selected = model<string>("");

  private readonly styleService = inject(DdDynamicStyleService);

  ngOnInit(): void {
    this.styleService.loadStyle("dd-tree-view", DD_TREE_VIEW_CSS);
  }
}
