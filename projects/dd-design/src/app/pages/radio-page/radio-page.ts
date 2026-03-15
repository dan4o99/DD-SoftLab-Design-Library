import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdRadioComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-radio-page',
  standalone: true,
  imports: [DdCardComponent, DdRadioComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './radio-page.html',
  styleUrl: './radio-page.scss',
})
export class RadioPage {}
