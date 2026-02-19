import { describe, it, expect } from "vitest";
import { DdCheckboxComponent } from "./dd-checkbox.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdCheckboxComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdCheckboxComponent);
    expect(component).toBeTruthy();
  });

  it("should emit checkedChange on change", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    let emittedValue: boolean | undefined;

    fixture.componentInstance.checkedChange.subscribe((value: boolean) => {
      emittedValue = value;
    });

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));
    fixture.detectChanges();

    expect(emittedValue).toBe(true);
  });

  it("should apply checked state", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("checked", true);
    fixture.detectChanges();

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.hasAttribute("disabled")).toBe(true);
  });

  it("should not emit clicked when disabled", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    checkbox.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(false);
  });

  it("should apply required attribute", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.hasAttribute("required")).toBe(true);
  });

  it("should apply name attribute", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("name", "agree");
    fixture.detectChanges();

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.getAttribute("name")).toBe("agree");
  });

  it("should apply id attribute", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("id", "checkbox-1");
    fixture.detectChanges();

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.getAttribute("id")).toBe("checkbox-1");
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("ariaLabel", "Agree to terms");
    fixture.detectChanges();

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    expect(checkbox.getAttribute("aria-label")).toBe("Agree to terms");
  });

  it("should emit clicked event", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const checkbox = element.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    checkbox.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdCheckboxComponent);
    fixture.componentRef.setInput("customClass", "custom-checkbox");
    fixture.detectChanges();

    const label = element.querySelector("label")!;
    expect(label.className).toContain("custom-checkbox");
  });
});
