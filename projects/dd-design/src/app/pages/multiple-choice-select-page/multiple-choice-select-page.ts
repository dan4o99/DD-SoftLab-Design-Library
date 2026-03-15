import { Component } from "@angular/core";
import {
  DdCardComponent,
  DdMultipleChoiceSelectComponent,
  DdTabComponent,
  DdTabsComponent,
  MultipleChoiceOption,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-multiple-choice-select-page",
  standalone: true,
  imports: [
    DdCardComponent,
    DdMultipleChoiceSelectComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./multiple-choice-select-page.html",
  styleUrl: "./multiple-choice-select-page.scss",
})
export class MultipleChoiceSelectPage {
  readonly options: MultipleChoiceOption[] = [
    { id: "design", label: "Design" },
    { id: "tokens", label: "Tokens" },
    { id: "themes", label: "Themes" },
    { id: "docs", label: "Documentation" },
    { id: "figma", label: "Figma kits" },
    { id: "patterns", label: "Patterns" },
  ];

  selected = ["design", "themes"];

  onSelectionChange(updated: string[]): void {
    this.selected = updated;
  }
}
