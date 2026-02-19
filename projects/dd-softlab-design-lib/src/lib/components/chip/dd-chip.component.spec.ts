import { describe, it, expect } from "vitest";
import { DdChipComponent } from "./dd-chip.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdChipComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdChipComponent);
    expect(component).toBeTruthy();
  });

  it("should emit clicked event when clicked", async () => {
    const { fixture, element } = await setupComponent(DdChipComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const button = element.querySelector("button")!;
    button.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should not emit clicked when disabled", async () => {
    const { fixture, element } = await setupComponent(DdChipComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const button = element.querySelector("button")!;
    button.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(false);
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdChipComponent);
    fixture.componentRef.setInput("ariaLabel", "Test chip");
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.getAttribute("aria-label")).toBe("Test chip");
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdChipComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.hasAttribute("disabled")).toBe(true);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdChipComponent);
    fixture.componentRef.setInput("customClass", "custom-chip");
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("custom-chip");
  });
});
