import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdSwitchComponent } from "./dd-switch.component";

describe("DdSwitchComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdSwitchComponent],
    }).compileComponents();
  });

  it("emits toggled on click", () => {
    const fixture = TestBed.createComponent(DdSwitchComponent);
    let emitted = false;

    fixture.componentInstance.toggled.subscribe((value: boolean) => {
      emitted = value;
    });

    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      ".dd-switch__button",
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(emitted).toBe(true);
  });

  it("does not emit when disabled", () => {
    const fixture = TestBed.createComponent(DdSwitchComponent);
    let emitted = false;

    fixture.componentInstance.toggled.subscribe(() => {
      emitted = true;
    });

    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      ".dd-switch__button",
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(emitted).toBe(false);
  });
});
