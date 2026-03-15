import { Component } from '@angular/core';
import {
  DdButtonComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [DdButtonComponent, DdCardComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './button-page.html',
  styleUrl: './button-page.scss',
})
export class ButtonPage {}
