import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdCardComponent } from "./dd-card.component";

describe("DdCardComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdCardComponent],
    }).compileComponents();
  });

  it("creates the card", () => {
    const fixture = TestBed.createComponent(DdCardComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it("applies custom class", () => {
    const fixture = TestBed.createComponent(DdCardComponent);
    fixture.componentRef.setInput("customClass", "custom-card");
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector(
      "article",
    ) as HTMLElement;
    expect(element.className).toContain("custom-card");
  });
});
