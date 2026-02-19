import { describe, it, expect } from "vitest";
import { DdRadioComponent } from "./dd-radio.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdRadioComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdRadioComponent);
    expect(component).toBeTruthy();
  });

  it("should emit selected with value on change", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("value", "option1");
    fixture.detectChanges();

    let emittedValue: string | undefined;
    fixture.componentInstance.selected.subscribe((value: string) => {
      emittedValue = value;
    });

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    radio.checked = true;
    radio.dispatchEvent(new Event("change"));
    fixture.detectChanges();

    expect(emittedValue).toBe("option1");
  });

  it("should apply checked state", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("checked", true);
    fixture.detectChanges();

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it("should apply name attribute", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("name", "gender");
    fixture.detectChanges();

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    expect(radio.getAttribute("name")).toBe("gender");
  });

  it("should apply value attribute", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("value", "male");
    fixture.detectChanges();

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    expect(radio.getAttribute("value")).toBe("male");
  });

  it("should apply id attribute", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("id", "radio-1");
    fixture.detectChanges();

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    expect(radio.getAttribute("id")).toBe("radio-1");
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("ariaLabel", "Gender option");
    fixture.detectChanges();

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    expect(radio.getAttribute("aria-label")).toBe("Gender option");
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    expect(radio.hasAttribute("disabled")).toBe(true);
  });

  it("should not emit clicked when disabled", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    radio.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(false);
  });

  it("should apply required attribute", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    expect(radio.hasAttribute("required")).toBe(true);
  });

  it("should emit clicked event", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const radio = element.querySelector(
      'input[type="radio"]',
    ) as HTMLInputElement;
    radio.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdRadioComponent);
    fixture.componentRef.setInput("customClass", "custom-radio");
    fixture.detectChanges();

    const label = element.querySelector("label") as HTMLLabelElement;
    expect(label.className).toContain("custom-radio");
  });
});
