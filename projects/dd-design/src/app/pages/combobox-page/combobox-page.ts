import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdComboboxComponent,
  DdComboboxOption,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-combobox-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdComboboxComponent,
  ],
  templateUrl: "./combobox-page.html",
  styleUrl: "./combobox-page.scss",
})
export class ComboboxPage {
  readonly selected = signal("");

  readonly fruits: DdComboboxOption[] = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
    { label: "Elderberry", value: "elderberry" },
    { label: "Fig", value: "fig" },
  ];
}
