import { Component, signal } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdTableColumn,
  DdTableComponent,
  DdTableRow,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-table-page",
  imports: [
    DdButtonComponent,
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdTableComponent,
  ],
  templateUrl: "./table-page.html",
  styleUrl: "./table-page.scss",
})
export class TablePage {
  readonly columns: DdTableColumn[] = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  readonly rows = signal<DdTableRow[]>([
    { id: 1, name: "Alice Johnson", role: "Designer", status: "Active" },
    { id: 2, name: "Bob Smith", role: "Developer", status: "Active" },
    { id: 3, name: "Carol White", role: "Manager", status: "On leave" },
    { id: 4, name: "Dave Brown", role: "QA", status: "Active" },
    { id: 5, name: "Eve Cooper", role: "Research", status: "Active" },
  ]);

  readonly loading = signal(false);

  toggleLoading(): void {
    this.loading.update((value) => !value);
  }

  onRowsChange(rows: DdTableRow[]): void {
    this.rows.set(rows);
  }
}
