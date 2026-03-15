import { Component } from '@angular/core';
import {
  DdCardComponent,
  DdSwitchComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

@Component({
  selector: 'app-switch-page',
  standalone: true,
  imports: [DdCardComponent, DdSwitchComponent, DdTabComponent, DdTabsComponent],
  templateUrl: './switch-page.html',
  styleUrl: './switch-page.scss',
})
export class SwitchPage {
  primaryEnabled = true;
  secondaryEnabled = false;

  onPrimaryToggled(next: boolean): void {
    this.primaryEnabled = next;
  }

  onSecondaryToggled(next: boolean): void {
    this.secondaryEnabled = next;
  }
}
