import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdColorPickerComponent } from "./dd-color-picker.component";

describe("DdColorPickerComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdColorPickerComponent],
    }).compileComponents();
  });

  it("creates the color picker", () => {
    const fixture = TestBed.createComponent(DdColorPickerComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it("emits changed on color input", () => {
    const fixture = TestBed.createComponent(DdColorPickerComponent);
    let emitted: string | undefined;

    fixture.componentInstance.changed.subscribe((value: string) => {
      emitted = value;
    });

    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      "input[type='color']",
    ) as HTMLInputElement;
    input.value = "#ff0000";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(emitted).toBe("#ff0000");
  });
});
