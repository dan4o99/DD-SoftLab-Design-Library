import { Component, signal } from "@angular/core";
import {
  DdCardComponent,
  DdSegmentedControlComponent,
  DdSegmentedControlOption,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-segmented-control-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdSegmentedControlComponent,
  ],
  templateUrl: "./segmented-control-page.html",
  styleUrl: "./segmented-control-page.scss",
})
export class SegmentedControlPage {
  readonly view = signal("list");
  readonly period = signal("month");

  readonly viewOptions: DdSegmentedControlOption[] = [
    { label: "List", value: "list" },
    { label: "Grid", value: "grid" },
    { label: "Table", value: "table" },
  ];

  readonly periodOptions: DdSegmentedControlOption[] = [
    { label: "Day", value: "day" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];
}
