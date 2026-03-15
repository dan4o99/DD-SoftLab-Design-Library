import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdMenuComponent,
  DdMenuItemComponent,
  DdSidebarComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-sidebar-page',
  standalone: true,
  imports: [
    DdCardComponent,
    DdMenuComponent,
    DdMenuItemComponent,
    DdSidebarComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: './sidebar-page.html',
  styleUrl: './sidebar-page.scss',
})
export class SidebarPage {
  sidebarWidth = 280;
  sidebarCollapsed = false;
  readonly sidebarStyle = {
    height: '320px',
  } as const;

  onSidebarWidthChange(width: number): void {
    this.sidebarWidth = width;
  }

  onSidebarCollapsedChange(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }
}
