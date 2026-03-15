import { toCssVar } from "../../theming/theme-tokens";

export const DD_TABLE_CSS = `
.dd-table-wrapper {
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.md")};
  background: ${toCssVar("color.surface")};
}

.dd-table__toolbar,
.dd-table__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${toCssVar("space.sm")};
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
}

.dd-table__toolbar {
  border-bottom: 1px solid ${toCssVar("color.border")};
}

.dd-table__pagination {
  border-top: 1px solid ${toCssVar("color.border")};
}

.dd-table__filter {
  min-width: min(18rem, 100%);
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
  font: inherit;
}

.dd-table__filter:focus-visible {
  outline: none;
  border-color: ${toCssVar("color.primary")};
  box-shadow: 0 0 0 3px color-mix(in srgb, ${toCssVar("color.primary")} 20%, transparent);
}

.dd-table__summary,
.dd-table__pagination-status {
  color: ${toCssVar("color.textSecondary")};
  font-size: 0.875rem;
}

.dd-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  background: ${toCssVar("color.surface")};
}

.dd-table thead th {
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  text-align: left;
  font-weight: 600;
  color: ${toCssVar("color.textMuted")};
  background: ${toCssVar("color.surfaceAlt")};
  border-bottom: 1px solid ${toCssVar("color.border")};
  white-space: nowrap;
  vertical-align: middle;
}

.dd-table--sticky-header thead th {
  position: sticky;
  top: 0;
  z-index: 2;
}

.dd-table tbody td {
  padding: ${toCssVar("space.sm")} ${toCssVar("space.md")};
  color: ${toCssVar("color.text")};
  border-bottom: 1px solid ${toCssVar("color.border")};
  vertical-align: middle;
}

.dd-table tbody tr:last-child td {
  border-bottom: none;
}

.dd-table--striped tbody tr:nth-child(odd) td {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-table--hoverable tbody tr:hover td {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-table__header-cell,
.dd-table__row-actions {
  display: flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
}

.dd-table__header-cell--draggable {
  cursor: grab;
}

.dd-table__header-cell--draggable:active {
  cursor: grabbing;
}

.dd-table__drag-handle {
  color: ${toCssVar("color.textSecondary")};
  font-size: 0.875rem;
  letter-spacing: -1px;
}

.dd-table__drag-handle--row {
  cursor: grab;
  user-select: none;
}

.dd-table__drag-handle--row:active {
  cursor: grabbing;
}

.dd-table__column--dragging {
  opacity: 0.6;
}

.dd-table__column--drag-over {
  outline: 2px dashed ${toCssVar("color.primary")};
  outline-offset: -2px;
}

.dd-table__sort-button,
.dd-table__icon-button,
.dd-table__pagination-button {
  border: 1px solid ${toCssVar("color.border")};
  border-radius: ${toCssVar("radius.sm")};
  background: ${toCssVar("color.surface")};
  color: ${toCssVar("color.text")};
  font: inherit;
  cursor: pointer;
}

.dd-table__sort-button {
  display: inline-flex;
  align-items: center;
  gap: ${toCssVar("space.xs")};
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
}

.dd-table__icon-button {
  width: 1.75rem;
  height: 1.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.dd-table__pagination-button {
  padding: ${toCssVar("space.xs")} ${toCssVar("space.sm")};
}

.dd-table__sort-button:hover:not(:disabled),
.dd-table__icon-button:hover:not(:disabled),
.dd-table__pagination-button:hover:not(:disabled) {
  background: ${toCssVar("color.surfaceAlt")};
}

.dd-table__sort-button:disabled,
.dd-table__icon-button:disabled,
.dd-table__pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dd-table__checkbox-column,
.dd-table__order-column {
  width: 1%;
  white-space: nowrap;
}

.dd-table__row--selected td {
  background: color-mix(in srgb, ${toCssVar("color.primary")} 10%, ${toCssVar("color.surface")});
}

.dd-table__row--dragging td {
  opacity: 0.6;
}

.dd-table__row--drag-over td {
  outline: 2px dashed ${toCssVar("color.primary")};
  outline-offset: -2px;
}

.dd-table__empty {
  text-align: center;
  color: ${toCssVar("color.textSecondary")};
  padding: ${toCssVar("space.lg")} ${toCssVar("space.md")};
}
`;
