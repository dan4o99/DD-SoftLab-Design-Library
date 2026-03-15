import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdDropdownComponent,
  DdDropdownOption,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-dropdown-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdDropdownComponent,
  ],
  templateUrl: "./dropdown-page.html",
  styleUrl: "./dropdown-page.scss",
})
export class DropdownPage {
  readonly selectedValue = signal("gamma");

  readonly searchableOptions: DdDropdownOption[] = [
    { value: "alpha", label: "Alpha" },
    { value: "beta", label: "Beta" },
    { value: "gamma", label: "Gamma" },
    { value: "delta", label: "Delta" },
    { value: "epsilon", label: "Epsilon" },
  ];

  onValueChange(value: string): void {
    this.selectedValue.set(value);
  }
}
