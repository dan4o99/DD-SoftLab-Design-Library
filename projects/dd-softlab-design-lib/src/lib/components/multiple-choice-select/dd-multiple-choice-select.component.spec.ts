import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import {
  DdMultipleChoiceSelectComponent,
  MultipleChoiceOption,
} from "./dd-multiple-choice-select.component";

describe("DdMultipleChoiceSelectComponent", () => {
  const options: MultipleChoiceOption[] = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdMultipleChoiceSelectComponent],
    }).compileComponents();
  });

  it("renders placeholder when no selection", () => {
    const fixture = TestBed.createComponent(DdMultipleChoiceSelectComponent);
    fixture.componentRef.setInput("ariaLabel", "Select items");
    fixture.detectChanges();

    const placeholder = fixture.nativeElement.querySelector(
      ".dd-multiple-choice-select__placeholder",
    ) as HTMLElement;
    expect(placeholder.textContent).toContain("Select items");
  });

  it("emits changed when option toggled", () => {
    const fixture = TestBed.createComponent(DdMultipleChoiceSelectComponent);
    let emitted: string[] | undefined;

    fixture.componentInstance.changed.subscribe((value: string[]) => {
      emitted = value;
    });

    fixture.componentRef.setInput("options", options);
    fixture.componentInstance.isOpen.set(true);
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector(
      ".dd-multiple-choice-select__checkbox",
    ) as HTMLInputElement;
    checkbox.click();
    fixture.detectChanges();

    expect(emitted).toEqual(["1"]);
  });
});
