import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdSidebarComponent } from "./dd-sidebar.component";

describe("DdSidebarComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdSidebarComponent],
    }).compileComponents();
  });

  it("applies width input to style", () => {
    const fixture = TestBed.createComponent(DdSidebarComponent);
    fixture.componentRef.setInput("width", 320);
    fixture.detectChanges();

    const aside = fixture.nativeElement.querySelector("aside") as HTMLElement;
    expect(aside.getAttribute("style") ?? "").toContain("width: 320px");
  });

  it("emits collapsedChange when collapsable toggled", () => {
    const fixture = TestBed.createComponent(DdSidebarComponent);
    let emitted = false;

    fixture.componentInstance.collapsedChange.subscribe(() => {
      emitted = true;
    });

    fixture.componentRef.setInput("collapsable", true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      ".dd-sidebar__collapse-icon",
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(emitted).toBe(true);
  });
});
