import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdDatePickerComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-date-picker-page',
  standalone: true,
  imports: [DdCardComponent, DdDatePickerComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './date-picker-page.html',
  styleUrl: './date-picker-page.scss',
})
export class DatePickerPage {}
