import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-tabs-page',
  standalone: true,
  imports: [DdCardComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './tabs-page.html',
  styleUrl: './tabs-page.scss',
})
export class TabsPage {}
