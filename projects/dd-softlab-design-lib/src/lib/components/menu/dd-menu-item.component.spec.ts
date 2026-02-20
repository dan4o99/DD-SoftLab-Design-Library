import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdMenuItemComponent } from "./dd-menu-item.component";
import { provideRouter } from "@angular/router";

describe("DdMenuItemComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DdMenuItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it("renders an anchor with href", () => {
    const fixture = TestBed.createComponent(DdMenuItemComponent);
    fixture.componentRef.setInput("target", "_self");
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector("a") as HTMLAnchorElement;
    expect(link.target).toBe("_self");
  });

  it("does not emit clicked when disabled", () => {
    const fixture = TestBed.createComponent(DdMenuItemComponent);
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
