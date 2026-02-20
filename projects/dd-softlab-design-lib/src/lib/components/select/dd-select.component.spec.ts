import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdSelectComponent } from "./dd-select.component";

describe("DdSelectComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdSelectComponent],
    }).compileComponents();
  });

  //   it("emits valueChange on change", () => {
  //     const fixture = TestBed.createComponent(DdSelectComponent);
  //     let emitted = "";

  //     fixture.componentInstance.valueChange.subscribe((value: string) => {
  //       emitted = value;
  //     });

  //     fixture.detectChanges();
  //     const select = fixture.nativeElement.querySelector(
  //       "select",
  //     ) as HTMLSelectElement;
  //     select.value = "two";
  //     select.dispatchEvent(new Event("change"));
  //     fixture.detectChanges();

  //     expect(emitted).toBe("two");
  //   });

  it("applies aria-label input", () => {
    const fixture = TestBed.createComponent(DdSelectComponent);
    fixture.componentRef.setInput("ariaLabel", "Pick one");
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector(
      "select",
    ) as HTMLSelectElement;
    expect(select.getAttribute("aria-label")).toBe("Pick one");
  });
});
