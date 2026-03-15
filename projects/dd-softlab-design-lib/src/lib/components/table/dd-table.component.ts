import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DdSkeletonComponent } from "../skeleton/dd-skeleton.component";
import { DD_TABLE_CSS } from "./dd-table.style";

export interface DdTableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
}

export type DdTableRow = Record<string, unknown>;
export type DdTableSortDirection = "asc" | "desc";

interface DdNormalizedTableRow {
  id: string;
  data: DdTableRow;
}

@Component({
  selector: "dd-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DdSkeletonComponent],
  template: `
    <div class="dd-table-wrapper" role="region" [attr.aria-label]="caption()">
      @if (filterable() || hasPagination()) {
        <div class="dd-table__toolbar">
          @if (filterable()) {
            <input
              class="dd-table__filter"
              type="search"
              [value]="filterQueryValue()"
              placeholder="Filter rows"
              aria-label="Filter rows"
              (input)="onFilterInput($event)"
            />
          }

          @if (hasPagination()) {
            <div class="dd-table__summary">
              Showing {{ visibleStart() }}-{{ visibleEnd() }} of
              {{ filteredRows().length }}
            </div>
          }
        </div>
      }

      <table
        class="dd-table"
        [class.dd-table--striped]="striped()"
        [class.dd-table--hoverable]="hoverable()"
        [class.dd-table--sticky-header]="stickyHeader()"
      >
        @if (caption()) {
          <caption class="sr-only">
            {{
              caption()
            }}
          </caption>
        }

        <thead>
          <tr>
            @if (selectableRows()) {
              <th scope="col" class="dd-table__checkbox-column">
                <input
                  type="checkbox"
                  [checked]="allVisibleRowsSelected()"
                  [disabled]="loading() || visibleRows().length === 0"
                  aria-label="Select all visible rows"
                  (change)="toggleAllVisibleRows($event)"
                />
              </th>
            }

            @for (column of orderedColumns(); track column.key) {
              <th
                scope="col"
                [style.width]="column.width || null"
                [attr.draggable]="reorderableColumns() ? true : null"
                [class.dd-table__column--dragging]="
                  draggedColumnKey() === column.key
                "
                [class.dd-table__column--drag-over]="
                  dragOverColumnKey() === column.key
                "
                (dragstart)="onColumnDragStart($event, column.key)"
                (dragover)="onColumnDragOver($event, column.key)"
                (drop)="onColumnDrop($event, column.key)"
                (dragend)="onColumnDragEnd()"
              >
                <div
                  class="dd-table__header-cell"
                  [class.dd-table__header-cell--draggable]="
                    reorderableColumns()
                  "
                >
                  @if (reorderableColumns()) {
                    <span class="dd-table__drag-handle" aria-hidden="true"
                      >⋮⋮</span
                    >
                  }

                  @if (canSortColumn(column)) {
                    <button
                      type="button"
                      class="dd-table__sort-button"
                      (click)="toggleSort(column.key)"
                    >
                      {{ column.label }}
                      <span aria-hidden="true">{{
                        sortIndicator(column.key)
                      }}</span>
                    </button>
                  } @else {
                    <span>{{ column.label }}</span>
                  }
                </div>
              </th>
            }

            @if (reorderableRows()) {
              <th scope="col" class="dd-table__order-column">Order</th>
            }
          </tr>
        </thead>

        <tbody>
          @if (loading()) {
            @for (placeholder of loadingRows(); track placeholder) {
              <tr>
                @if (selectableRows()) {
                  <td class="dd-table__checkbox-column">
                    <dd-skeleton variant="text" width="1rem" height="1rem" />
                  </td>
                }

                @for (column of orderedColumns(); track column.key) {
                  <td><dd-skeleton variant="text" width="100%" /></td>
                }

                @if (reorderableRows()) {
                  <td class="dd-table__order-column">
                    <dd-skeleton variant="text" width="3rem" />
                  </td>
                }
              </tr>
            }
          } @else if (visibleRows().length === 0) {
            <tr>
              <td class="dd-table__empty" [attr.colspan]="columnSpan()">
                No rows found.
              </td>
            </tr>
          } @else {
            @for (row of visibleRows(); track row.id) {
              <tr
                [class.dd-table__row--selected]="isRowSelected(row.id)"
                [class.dd-table__row--dragging]="draggedRowId() === row.id"
                [class.dd-table__row--drag-over]="dragOverRowId() === row.id"
                (dragover)="onRowDragOver($event, row.id)"
                (drop)="onRowDrop($event, row.id)"
              >
                @if (selectableRows()) {
                  <td class="dd-table__checkbox-column">
                    <input
                      type="checkbox"
                      [checked]="isRowSelected(row.id)"
                      [attr.aria-label]="'Select row ' + row.id"
                      (change)="toggleRow(row.id, $event)"
                    />
                  </td>
                }

                @for (column of orderedColumns(); track column.key) {
                  <td>{{ formatCellValue(row.data[column.key]) }}</td>
                }

                @if (reorderableRows()) {
                  <td class="dd-table__order-column">
                    <div class="dd-table__row-actions">
                      <span
                        class="dd-table__drag-handle dd-table__drag-handle--row"
                        [attr.draggable]="
                          reorderableRows() && !hasActiveSort() ? true : null
                        "
                        [attr.aria-label]="'Drag row ' + row.id"
                        [attr.title]="
                          hasActiveSort()
                            ? 'Disable sorting to drag rows'
                            : 'Drag to reorder row'
                        "
                        (dragstart)="onRowDragStart($event, row.id)"
                        (dragend)="onRowDragEnd()"
                        aria-hidden="true"
                        >⋮⋮</span
                      >
                    </div>
                  </td>
                }
              </tr>
            }
          }
        </tbody>
      </table>

      @if (hasPagination() && !loading()) {
        <div class="dd-table__pagination">
          <button
            type="button"
            class="dd-table__pagination-button"
            [disabled]="currentPage() <= 1"
            (click)="goToPage(currentPage() - 1)"
          >
            Previous
          </button>
          <span class="dd-table__pagination-status">
            Page {{ currentPage() }} of {{ pageCount() }}
          </span>
          <button
            type="button"
            class="dd-table__pagination-button"
            [disabled]="currentPage() >= pageCount()"
            (click)="goToPage(currentPage() + 1)"
          >
            Next
          </button>
        </div>
      }
    </div>
  `,
})
export class DdTableComponent {
  readonly columns = input<DdTableColumn[]>([]);
  readonly rows = input<DdTableRow[]>([]);
  readonly striped = input(false, { transform: booleanAttribute });
  readonly hoverable = input(true, { transform: booleanAttribute });
  readonly caption = input("");
  readonly stickyHeader = input(false, { transform: booleanAttribute });
  readonly selectableRows = input(false, { transform: booleanAttribute });
  readonly filterable = input(false, { transform: booleanAttribute });
  readonly sortable = input(false, { transform: booleanAttribute });
  readonly reorderableRows = input(false, { transform: booleanAttribute });
  readonly reorderableColumns = input(false, { transform: booleanAttribute });
  readonly pageSize = input(0);
  readonly loading = input(false, { transform: booleanAttribute });
  readonly loadingRowCount = input(5);
  readonly rowIdKey = input("id");
  readonly columnOrder = input<string[]>([]);
  readonly filterQuery = input("");

  readonly rowsChange = output<DdTableRow[]>();
  readonly selectedRowsChange = output<DdTableRow[]>();
  readonly columnOrderChange = output<string[]>();
  readonly filterQueryChange = output<string>();
  readonly sortChange = output<{
    key: string;
    direction: DdTableSortDirection;
  } | null>();
  readonly pageChange = output<number>();

  private readonly styleService = inject(DdDynamicStyleService);
  private readonly internalRows = signal<DdNormalizedTableRow[]>([]);
  private readonly internalSelectedRowIds = signal<string[]>([]);
  private readonly internalColumnOrder = signal<string[]>([]);
  private readonly internalFilterQuery = signal("");
  readonly draggedColumnKey = signal<string | null>(null);
  readonly dragOverColumnKey = signal<string | null>(null);
  readonly draggedRowId = signal<string | null>(null);
  readonly dragOverRowId = signal<string | null>(null);
  private readonly currentSort = signal<{
    key: string;
    direction: DdTableSortDirection;
  } | null>(null);
  readonly currentPage = signal(1);

  readonly orderedColumns = computed(() => {
    const columns = this.columns();
    const order = this.internalColumnOrder();
    if (order.length === 0) {
      return columns;
    }

    const columnMap = new Map(columns.map((column) => [column.key, column]));
    const ordered = order
      .map((key) => columnMap.get(key))
      .filter((column): column is DdTableColumn => !!column);
    const missing = columns.filter((column) => !order.includes(column.key));
    return [...ordered, ...missing];
  });

  readonly filterQueryValue = computed(() => this.internalFilterQuery());

  readonly filteredRows = computed(() => {
    const query = this.filterQueryValue().trim().toLowerCase();
    const columns = this.orderedColumns();
    let rows = [...this.internalRows()];

    if (this.filterable() && query) {
      rows = rows.filter((row) =>
        columns.some((column) =>
          this.formatCellValue(row.data[column.key])
            .toLowerCase()
            .includes(query),
        ),
      );
    }

    const sort = this.currentSort();
    if (sort) {
      rows.sort((left, right) => {
        const leftValue = left.data[sort.key];
        const rightValue = right.data[sort.key];

        if (typeof leftValue === "number" && typeof rightValue === "number") {
          return sort.direction === "asc"
            ? leftValue - rightValue
            : rightValue - leftValue;
        }

        const leftText = this.formatCellValue(leftValue).toLowerCase();
        const rightText = this.formatCellValue(rightValue).toLowerCase();
        const comparison = leftText.localeCompare(rightText, undefined, {
          numeric: true,
          sensitivity: "base",
        });

        return sort.direction === "asc" ? comparison : -comparison;
      });
    }

    return rows;
  });

  readonly pageCount = computed(() => {
    if (!this.hasPagination()) {
      return 1;
    }

    return Math.max(1, Math.ceil(this.filteredRows().length / this.pageSize()));
  });

  readonly visibleRows = computed(() => {
    const rows = this.filteredRows();
    if (!this.hasPagination()) {
      return rows;
    }

    const start = (this.currentPage() - 1) * this.pageSize();
    return rows.slice(start, start + this.pageSize());
  });

  readonly loadingRows = computed(() =>
    Array.from(
      { length: Math.max(1, this.loadingRowCount()) },
      (_, index) => index,
    ),
  );

  readonly allVisibleRowsSelected = computed(() => {
    const visibleIds = this.visibleRows().map((row) => row.id);
    return (
      visibleIds.length > 0 &&
      visibleIds.every((id) => this.internalSelectedRowIds().includes(id))
    );
  });

  readonly columnSpan = computed(
    () =>
      this.orderedColumns().length +
      (this.selectableRows() ? 1 : 0) +
      (this.reorderableRows() ? 1 : 0),
  );

  readonly visibleStart = computed(() => {
    if (this.filteredRows().length === 0) {
      return 0;
    }

    return this.hasPagination()
      ? (this.currentPage() - 1) * this.pageSize() + 1
      : 1;
  });

  readonly visibleEnd = computed(() => {
    if (this.filteredRows().length === 0) {
      return 0;
    }

    return this.visibleStart() + this.visibleRows().length - 1;
  });

  constructor() {
    this.styleService.loadStyle("dd-table", DD_TABLE_CSS);

    effect(() => {
      const rowIdKey = this.rowIdKey();
      this.internalRows.set(
        this.rows().map((row, index) => ({
          id: this.resolveRowId(row, index, rowIdKey),
          data: row,
        })),
      );

      const validIds = new Set(this.internalRows().map((row) => row.id));
      const pruned = this.internalSelectedRowIds().filter((id) =>
        validIds.has(id),
      );
      if (pruned.length !== this.internalSelectedRowIds().length) {
        this.internalSelectedRowIds.set(pruned);
        this.emitSelectedRows();
      }
    });

    effect(() => {
      const requestedOrder = this.columnOrder();
      this.internalColumnOrder.set(
        requestedOrder.length > 0
          ? requestedOrder
          : this.columns().map((column) => column.key),
      );
    });

    effect(() => {
      this.internalFilterQuery.set(this.filterQuery());
      this.currentPage.set(1);
    });

    effect(() => {
      const maxPage = this.pageCount();
      if (this.currentPage() > maxPage) {
        this.currentPage.set(maxPage);
      }
    });
  }

  hasPagination(): boolean {
    return this.pageSize() > 0;
  }

  hasActiveSort(): boolean {
    return this.currentSort() !== null;
  }

  canSortColumn(column: DdTableColumn): boolean {
    return this.sortable() && column.sortable !== false;
  }

  sortIndicator(columnKey: string): string {
    const sort = this.currentSort();
    if (!sort || sort.key !== columnKey) {
      return "↕";
    }

    return sort.direction === "asc" ? "↑" : "↓";
  }

  toggleSort(columnKey: string): void {
    const column = this.columns().find((item) => item.key === columnKey);
    if (!column || !this.canSortColumn(column)) {
      return;
    }

    const current = this.currentSort();
    if (!current || current.key !== columnKey) {
      this.currentSort.set({ key: columnKey, direction: "asc" });
    } else if (current.direction === "asc") {
      this.currentSort.set({ key: columnKey, direction: "desc" });
    } else {
      this.currentSort.set(null);
    }

    this.currentPage.set(1);
    this.sortChange.emit(this.currentSort());
  }

  onFilterInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const value = target?.value ?? "";
    this.internalFilterQuery.set(value);
    this.currentPage.set(1);
    this.filterQueryChange.emit(value);
  }

  isRowSelected(rowId: string): boolean {
    return this.internalSelectedRowIds().includes(rowId);
  }

  toggleRow(rowId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement | null)?.checked ?? false;
    this.internalSelectedRowIds.update((selected) =>
      checked
        ? Array.from(new Set([...selected, rowId]))
        : selected.filter((id) => id !== rowId),
    );
    this.emitSelectedRows();
  }

  toggleAllVisibleRows(event: Event): void {
    const checked = (event.target as HTMLInputElement | null)?.checked ?? false;
    const visibleIds = this.visibleRows().map((row) => row.id);

    this.internalSelectedRowIds.update((selected) => {
      if (checked) {
        return Array.from(new Set([...selected, ...visibleIds]));
      }

      return selected.filter((id) => !visibleIds.includes(id));
    });

    this.emitSelectedRows();
  }

  onRowDragStart(event: DragEvent, rowId: string): void {
    if (!this.reorderableRows() || this.hasActiveSort()) {
      event.preventDefault();
      return;
    }

    this.draggedRowId.set(rowId);
    this.dragOverRowId.set(rowId);

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", rowId);
    }
  }

  onRowDragOver(event: DragEvent, targetRowId: string): void {
    if (
      !this.reorderableRows() ||
      this.hasActiveSort() ||
      !this.draggedRowId()
    ) {
      return;
    }

    event.preventDefault();
    this.dragOverRowId.set(targetRowId);
  }

  onRowDrop(event: DragEvent, targetRowId: string): void {
    if (!this.reorderableRows() || this.hasActiveSort()) {
      return;
    }

    event.preventDefault();

    const sourceRowId =
      this.draggedRowId() ?? event.dataTransfer?.getData("text/plain") ?? null;

    if (!sourceRowId || sourceRowId === targetRowId) {
      this.onRowDragEnd();
      return;
    }

    this.internalRows.update((rows) => {
      const nextRows = [...rows];
      const sourceIndex = nextRows.findIndex((row) => row.id === sourceRowId);
      const targetIndex = nextRows.findIndex((row) => row.id === targetRowId);

      if (sourceIndex < 0 || targetIndex < 0) {
        return nextRows;
      }

      const [movedRow] = nextRows.splice(sourceIndex, 1);
      nextRows.splice(targetIndex, 0, movedRow);
      return nextRows;
    });

    this.rowsChange.emit(this.internalRows().map((row) => row.data));
    this.onRowDragEnd();
  }

  onRowDragEnd(): void {
    this.draggedRowId.set(null);
    this.dragOverRowId.set(null);
  }

  onColumnDragStart(event: DragEvent, columnKey: string): void {
    if (!this.reorderableColumns()) {
      return;
    }

    this.draggedColumnKey.set(columnKey);
    this.dragOverColumnKey.set(columnKey);

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", columnKey);
    }
  }

  onColumnDragOver(event: DragEvent, columnKey: string): void {
    if (!this.reorderableColumns() || !this.draggedColumnKey()) {
      return;
    }

    event.preventDefault();
    this.dragOverColumnKey.set(columnKey);
  }

  onColumnDrop(event: DragEvent, targetColumnKey: string): void {
    if (!this.reorderableColumns()) {
      return;
    }

    event.preventDefault();

    const sourceColumnKey =
      this.draggedColumnKey() ??
      event.dataTransfer?.getData("text/plain") ??
      null;

    if (!sourceColumnKey || sourceColumnKey === targetColumnKey) {
      this.onColumnDragEnd();
      return;
    }

    this.internalColumnOrder.update((order) => {
      const currentOrder =
        order.length > 0
          ? [...order]
          : this.columns().map((column) => column.key);
      const sourceIndex = currentOrder.indexOf(sourceColumnKey);
      const targetIndex = currentOrder.indexOf(targetColumnKey);

      if (sourceIndex < 0 || targetIndex < 0) {
        return currentOrder;
      }

      currentOrder.splice(sourceIndex, 1);
      currentOrder.splice(targetIndex, 0, sourceColumnKey);
      return currentOrder;
    });

    this.columnOrderChange.emit(this.internalColumnOrder());
    this.onColumnDragEnd();
  }

  onColumnDragEnd(): void {
    this.draggedColumnKey.set(null);
    this.dragOverColumnKey.set(null);
  }

  goToPage(page: number): void {
    const nextPage = Math.min(Math.max(page, 1), this.pageCount());
    this.currentPage.set(nextPage);
    this.pageChange.emit(nextPage);
  }

  formatCellValue(value: unknown): string {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value);
  }

  private emitSelectedRows(): void {
    const selected = this.internalRows()
      .filter((row) => this.internalSelectedRowIds().includes(row.id))
      .map((row) => row.data);
    this.selectedRowsChange.emit(selected);
  }

  private resolveRowId(
    row: DdTableRow,
    index: number,
    rowIdKey: string,
  ): string {
    const candidate = row[rowIdKey];
    if (
      candidate !== undefined &&
      candidate !== null &&
      String(candidate).trim().length > 0
    ) {
      return String(candidate);
    }

    return `row-${index}`;
  }
}
