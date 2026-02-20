import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdTextareaComponent } from "./dd-textarea.component";

describe("DdTextareaComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdTextareaComponent],
    }).compileComponents();
  });

  it("creates with default rows", () => {
    const fixture = TestBed.createComponent(DdTextareaComponent);
    fixture.detectChanges();

    const textarea = fixture.nativeElement.querySelector(
      "textarea",
    ) as HTMLTextAreaElement;
    expect(textarea.getAttribute("rows")).toBe("4");
  });

  it("emits valueChange on input", () => {
    const fixture = TestBed.createComponent(DdTextareaComponent);
    let emitted = "";

    fixture.componentInstance.valueChange.subscribe((value: string) => {
      emitted = value;
    });

    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector(
      "textarea",
    ) as HTMLTextAreaElement;
    textarea.value = "notes";
    textarea.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(emitted).toBe("notes");
  });
});
