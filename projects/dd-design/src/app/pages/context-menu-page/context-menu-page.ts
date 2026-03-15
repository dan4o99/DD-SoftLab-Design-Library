import { Component, signal } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdContextMenuComponent,
  DdContextMenuEntry,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-context-menu-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdContextMenuComponent,
    DdButtonComponent,
  ],
  templateUrl: "./context-menu-page.html",
  styleUrl: "./context-menu-page.scss",
})
export class ContextMenuPage {
  readonly lastAction = signal("(none)");

  readonly items: DdContextMenuEntry[] = [
    { label: "Edit", value: "edit", icon: "✏️" },
    { label: "Duplicate", value: "duplicate", icon: "📋" },
    { separator: true },
    { label: "Archive", value: "archive" },
    { separator: true },
    { label: "Delete", value: "delete", icon: "🗑️", danger: true },
  ];

  onAction(value: string): void {
    this.lastAction.set(value);
  }
}
