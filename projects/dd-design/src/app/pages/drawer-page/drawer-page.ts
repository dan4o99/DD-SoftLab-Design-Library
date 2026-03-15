import { Component, signal } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdDrawerComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-drawer-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdDrawerComponent,
    DdButtonComponent,
  ],
  templateUrl: "./drawer-page.html",
  styleUrl: "./drawer-page.scss",
})
export class DrawerPage {
  readonly open = signal(false);
  readonly placement = signal<"left" | "right" | "top" | "bottom">("right");

  openDrawer(p: "left" | "right" | "top" | "bottom"): void {
    this.placement.set(p);
    this.open.set(true);
  }
}
