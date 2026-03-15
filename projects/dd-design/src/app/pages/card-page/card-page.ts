import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [DdCardComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './card-page.html',
  styleUrl: './card-page.scss',
})
export class CardPage {}
