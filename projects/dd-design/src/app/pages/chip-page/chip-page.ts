import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdChipComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-chip-page",
  standalone: true,
  imports: [DdCardComponent, DdChipComponent, DdTabComponent, DdTabsComponent],
  templateUrl: "./chip-page.html",
  styleUrl: "./chip-page.scss",
})
export class ChipPage {
  readonly removableChips = signal(["Design", "Tokens", "Theme"]);

  removeChip(label: string): void {
    this.removableChips.update((chips) =>
      chips.filter((chip) => chip !== label),
    );
  }
}
