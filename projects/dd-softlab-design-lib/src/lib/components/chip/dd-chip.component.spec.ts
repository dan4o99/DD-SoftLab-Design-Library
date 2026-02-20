import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdChipComponent } from "./dd-chip.component";

describe("DdChipComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdChipComponent],
    }).compileComponents();
  });

  it("creates the chip", () => {
    const fixture = TestBed.createComponent(DdChipComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it("does not emit clicked when disabled", () => {
    const fixture = TestBed.createComponent(DdChipComponent);
    let emitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      emitted = true;
    });

    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(emitted).toBe(false);
  });
});
