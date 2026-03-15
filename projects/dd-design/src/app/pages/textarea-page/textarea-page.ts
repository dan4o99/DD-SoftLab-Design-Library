import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdTextareaComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-textarea-page',
  standalone: true,
  imports: [DdCardComponent, DdTextareaComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './textarea-page.html',
  styleUrl: './textarea-page.scss',
})
export class TextareaPage {}
