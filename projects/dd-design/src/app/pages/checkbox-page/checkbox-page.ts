import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { disabled, form, FormField, required } from '@angular/forms/signals';
import {
  DdCardComponent,
  DdCheckboxComponent,
  DdTabComponent,
  DdTabsComponent,
} from '@dd-softlab/dd-softlab-design-lib';

interface CheckboxData {
  checked1: boolean;
  checked2: boolean;
  checked3: boolean;
}

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [DdCardComponent, DdCheckboxComponent, DdTabComponent, DdTabsComponent, FormField],
  templateUrl: './checkbox-page.html',
  styleUrl: './checkbox-page.scss',
})
export class CheckboxPage {
  checkboxModel = signal<CheckboxData>({ checked1: false, checked2: false, checked3: false });
  checkboxForm = form(this.checkboxModel, (schema) => {
    required(schema.checked1);
    required(schema.checked2);
    disabled(schema.checked3, ({ valueOf }) => {
      return valueOf(schema.checked2);
    });
  });
}
