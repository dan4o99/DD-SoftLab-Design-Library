import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdRadioComponent } from "./dd-radio.component";

describe("DdRadioComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdRadioComponent],
    }).compileComponents();
  });

  it("emits selected on change", () => {
    const fixture = TestBed.createComponent(DdRadioComponent);
    let emitted = "";

    fixture.componentInstance.selected.subscribe((value: string) => {
      emitted = value;
    });

    fixture.componentRef.setInput("value", "option1");
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      "input[type='radio']",
    ) as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event("change"));
    fixture.detectChanges();

    expect(emitted).toBe("option1");
  });

  it("does not emit clicked when disabled", () => {
    const fixture = TestBed.createComponent(DdRadioComponent);
    let emitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      emitted = true;
    });

    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      "input[type='radio']",
    ) as HTMLInputElement;
    input.click();
    fixture.detectChanges();

    expect(emitted).toBe(false);
  });
});
