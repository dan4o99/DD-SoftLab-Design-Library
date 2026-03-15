import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdMenuComponent,
  DdMenuItemComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [DdCardComponent, DdMenuComponent, DdMenuItemComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.scss',
})
export class MenuPage {}
