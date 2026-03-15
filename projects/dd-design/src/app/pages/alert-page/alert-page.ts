import { Component } from '@angular/core';
import {
  DdAlertComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-alert-page',
  standalone: true,
  imports: [DdAlertComponent, DdCardComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './alert-page.html',
  styleUrl: './alert-page.scss',
})
export class AlertPage {}
