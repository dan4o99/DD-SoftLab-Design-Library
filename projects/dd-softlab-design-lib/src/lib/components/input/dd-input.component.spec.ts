import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdInputComponent } from "./dd-input.component";

describe("DdInputComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdInputComponent],
    }).compileComponents();
  });

  it("applies type input", () => {
    const fixture = TestBed.createComponent(DdInputComponent);
    fixture.componentRef.setInput("type", "email");
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      "input",
    ) as HTMLInputElement;
    expect(input.getAttribute("type")).toBe("email");
  });

  it("emits valueChange on input", () => {
    const fixture = TestBed.createComponent(DdInputComponent);
    let emitted = "";

    fixture.componentInstance.valueChange.subscribe((value: string) => {
      emitted = value;
    });

    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      "input",
    ) as HTMLInputElement;
    input.value = "hello";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(emitted).toBe("hello");
  });
});
