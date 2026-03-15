import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdColorPickerComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-color-picker-page',
  standalone: true,
  imports: [DdCardComponent, DdColorPickerComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './color-picker-page.html',
  styleUrl: './color-picker-page.scss',
})
export class ColorPickerPage {}
