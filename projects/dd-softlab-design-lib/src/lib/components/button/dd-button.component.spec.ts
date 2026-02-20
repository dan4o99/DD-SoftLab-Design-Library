import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdButtonComponent } from "./dd-button.component";

describe("DdButtonComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdButtonComponent],
    }).compileComponents();
  });

  it("renders a button with default type", async () => {
    const fixture = TestBed.createComponent(DdButtonComponent);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button");

    expect(button).toBeTruthy();
    expect(button?.getAttribute("type")).toBe("button");
  });

  it("applies the secondary variant class", async () => {
    const fixture = TestBed.createComponent(DdButtonComponent);
    fixture.componentRef.setInput("variant", "secondary");
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button") as HTMLElement;
    expect(button.className).toContain("dd-button--secondary");
  });

  it("applies the small size class", async () => {
    const fixture = TestBed.createComponent(DdButtonComponent);
    fixture.componentRef.setInput("size", "small");
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button") as HTMLElement;
    expect(button.className).toContain("dd-button--sm");
  });

  it("applies outlined styling", async () => {
    const fixture = TestBed.createComponent(DdButtonComponent);
    fixture.componentRef.setInput("outlined", true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector("button") as HTMLElement;
    expect(button.className).toContain("dd-button--outlined");
  });

  it("disables the button and sets aria-busy when loading", async () => {
    const fixture = TestBed.createComponent(DdButtonComponent);
    fixture.componentRef.setInput("loading", true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("emits clicked when activated", async () => {
    const fixture = TestBed.createComponent(DdButtonComponent);
    let clicked = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clicked = true;
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(clicked).toBe(true);
  });

  it("does not emit clicked when disabled", async () => {
    const fixture = TestBed.createComponent(DdButtonComponent);
    let clicked = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clicked = true;
    });

    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(clicked).toBe(false);
  });
});
