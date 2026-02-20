import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdDatePickerComponent } from "./dd-date-picker.component";

describe("DdDatePickerComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdDatePickerComponent],
    }).compileComponents();
  });

  it("applies value input", () => {
    const fixture = TestBed.createComponent(DdDatePickerComponent);
    fixture.componentRef.setInput("value", "2026-02-19");
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      "input[type='date']",
    ) as HTMLInputElement;
    expect(input.value).toBe("2026-02-19");
  });

  it("emits changed on input", () => {
    const fixture = TestBed.createComponent(DdDatePickerComponent);
    let emitted = "";

    fixture.componentInstance.changed.subscribe((value: string) => {
      emitted = value;
    });

    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      "input[type='date']",
    ) as HTMLInputElement;
    input.value = "2026-02-20";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(emitted).toBe("2026-02-20");
  });
});
