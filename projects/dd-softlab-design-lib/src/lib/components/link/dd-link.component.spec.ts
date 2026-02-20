import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdLinkComponent } from "./dd-link.component";

describe("DdLinkComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdLinkComponent],
    }).compileComponents();
  });

  it("applies href input", () => {
    const fixture = TestBed.createComponent(DdLinkComponent);
    fixture.componentRef.setInput("href", "https://example.com");
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector("a") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("https://example.com");
  });

  it("does not emit clicked when disabled", () => {
    const fixture = TestBed.createComponent(DdLinkComponent);
    let emitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      emitted = true;
    });

    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector("a") as HTMLAnchorElement;
    link.click();
    fixture.detectChanges();

    expect(emitted).toBe(false);
  });
});
