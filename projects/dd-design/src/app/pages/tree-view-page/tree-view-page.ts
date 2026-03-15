import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
  DdTreeNode,
  DdTreeViewComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-tree-view-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdTreeViewComponent,
  ],
  templateUrl: "./tree-view-page.html",
  styleUrl: "./tree-view-page.scss",
})
export class TreeViewPage {
  readonly selected = signal("");

  readonly tree: DdTreeNode[] = [
    {
      id: "src",
      label: "src",
      icon: "📁",
      children: [
        {
          id: "app",
          label: "app",
          icon: "📁",
          children: [
            { id: "app.ts", label: "app.ts", icon: "📄" },
            { id: "app.html", label: "app.html", icon: "📄" },
          ],
        },
        { id: "styles.scss", label: "styles.scss", icon: "📄" },
        { id: "main.ts", label: "main.ts", icon: "📄" },
      ],
    },
    {
      id: "public",
      label: "public",
      icon: "📁",
      children: [{ id: "favicon.ico", label: "favicon.ico", icon: "🖼️" }],
    },
    { id: "angular.json", label: "angular.json", icon: "📄" },
  ];
}
