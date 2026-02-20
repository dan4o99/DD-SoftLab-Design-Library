import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdMenuComponent } from "./dd-menu.component";

describe("DdMenuComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdMenuComponent],
    }).compileComponents();
  });

  it("applies horizontal orientation class", () => {
    const fixture = TestBed.createComponent(DdMenuComponent);
    fixture.componentRef.setInput("orientation", "horizontal");
    fixture.detectChanges();

    const nav = fixture.nativeElement.querySelector("nav") as HTMLElement;
    expect(nav.className).toContain("dd-menu--horizontal");
  });

  it("emits clicked on nav click", () => {
    const fixture = TestBed.createComponent(DdMenuComponent);
    let emitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      emitted = true;
    });

    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector("nav") as HTMLElement;
    nav.click();
    fixture.detectChanges();

    expect(emitted).toBe(true);
  });
});
