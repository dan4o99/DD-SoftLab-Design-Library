import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdAccordionComponent } from "./dd-accordion.component";

describe("DdAccordionComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdAccordionComponent],
    }).compileComponents();
  });

  it("creates the accordion", () => {
    const fixture = TestBed.createComponent(DdAccordionComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it("emits openChange when header is clicked", () => {
    const fixture = TestBed.createComponent(DdAccordionComponent);
    const component = fixture.componentInstance;
    let emitted: boolean | undefined;

    component.openChange.subscribe((value: boolean) => {
      emitted = value;
    });

    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector(
      ".dd-accordion__header",
    ) as HTMLButtonElement;
    header.click();
    fixture.detectChanges();

    expect(emitted).toBe(true);
  });
});
