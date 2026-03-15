import { Component } from '@angular/core';
import {
  DdAccordionComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-accordion-page',
  standalone: true,
  imports: [DdAccordionComponent, DdCardComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './accordion-page.html',
  styleUrl: './accordion-page.scss',
})
export class AccordionPage {}
