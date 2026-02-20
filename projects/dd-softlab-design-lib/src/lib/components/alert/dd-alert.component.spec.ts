import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdAlertComponent } from "./dd-alert.component";

describe("DdAlertComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdAlertComponent],
    }).compileComponents();
  });

  it("creates component", () => {
    const fixture = TestBed.createComponent(DdAlertComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it("renders with default variant class", () => {
    const fixture = TestBed.createComponent(DdAlertComponent);
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector("div");
    expect(div?.className).toContain("dd-alert");
  });

  it("renders with default role attribute", () => {
    const fixture = TestBed.createComponent(DdAlertComponent);
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector("div");
    expect(div?.getAttribute("role")).toBe("status");
  });

  it("applies success variant class", () => {
    const fixture = TestBed.createComponent(DdAlertComponent);
    fixture.componentRef.setInput("variant", "success");
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector("div");
    expect(div?.className).toContain("dd-alert--success");
  });

  it("applies warning variant class", () => {
    const fixture = TestBed.createComponent(DdAlertComponent);
    fixture.componentRef.setInput("variant", "warning");
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector("div");
    expect(div?.className).toContain("dd-alert--warning");
  });

  it("applies danger variant class", () => {
    const fixture = TestBed.createComponent(DdAlertComponent);
    fixture.componentRef.setInput("variant", "danger");
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector("div");
    expect(div?.className).toContain("dd-alert--danger");
  });

  it("applies custom role attribute", () => {
    const fixture = TestBed.createComponent(DdAlertComponent);
    fixture.componentRef.setInput("role", "alert");
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector("div");
    expect(div?.getAttribute("role")).toBe("alert");
  });

  it("applies customClass", () => {
    const fixture = TestBed.createComponent(DdAlertComponent);
    fixture.componentRef.setInput("customClass", "custom-alert");
    fixture.detectChanges();

    const div = fixture.nativeElement.querySelector("div");
    expect(div?.className).toContain("custom-alert");
  });
});
