import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdInputComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [DdCardComponent, DdInputComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './input-page.html',
  styleUrl: './input-page.scss',
})
export class InputPage {}
