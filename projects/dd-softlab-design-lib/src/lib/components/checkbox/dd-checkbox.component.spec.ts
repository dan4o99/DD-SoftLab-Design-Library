import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdCheckboxComponent } from "./dd-checkbox.component";

describe("DdCheckboxComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdCheckboxComponent],
    }).compileComponents();
  });

  it("applies checked input", () => {
    const fixture = TestBed.createComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("checked", true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      "input[type='checkbox']",
    ) as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it("emits checkedChange on change", () => {
    const fixture = TestBed.createComponent(DdCheckboxComponent);
    let emitted = false;

    fixture.componentInstance.checkedChange.subscribe(() => {
      emitted = true;
    });

    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      "input[type='checkbox']",
    ) as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event("change"));
    fixture.detectChanges();

    expect(emitted).toBe(true);
  });
});
