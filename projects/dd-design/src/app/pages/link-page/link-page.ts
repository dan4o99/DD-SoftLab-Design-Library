import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdLinkComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-link-page',
  standalone: true,
  imports: [DdCardComponent, DdLinkComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './link-page.html',
  styleUrl: './link-page.scss',
})
export class LinkPage {}
