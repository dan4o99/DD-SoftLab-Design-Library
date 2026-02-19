import { describe, it, expect } from "vitest";
import { DdColorPickerComponent } from "./dd-color-picker.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdColorPickerComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdColorPickerComponent);
    expect(component).toBeTruthy();
  });

  it("should emit changed with valid hex color", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    let emittedValue: string | undefined;

    fixture.componentInstance.changed.subscribe((value: string) => {
      emittedValue = value;
    });

    const colorInput = element.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    colorInput.value = "#ff5733";
    colorInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(emittedValue).toBe("#ff5733");
  });

  it("should sync text input with color input", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    const colorInput = element.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    const textInput = element.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    colorInput.value = "#aabbcc";
    colorInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(textInput.value).toBe("#aabbcc");
  });

  it("should validate hex color in text input", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    let emittedValue: string | undefined;

    fixture.componentInstance.changed.subscribe((value: string) => {
      emittedValue = value;
    });

    const textInput = element.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    // Valid hex
    textInput.value = "#123abc";
    textInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(emittedValue).toBe("#123abc");

    // Invalid hex (should not emit)
    emittedValue = undefined;
    textInput.value = "invalid";
    textInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(emittedValue).toBeUndefined();
  });

  it("should apply color input value", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    fixture.componentRef.setInput("value", "#ff0000");
    fixture.detectChanges();

    const colorInput = element.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    expect(colorInput.value).toBe("#ff0000");
  });

  it("should apply disabled attribute to both inputs", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const colorInput = element.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    const textInput = element.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;

    expect(colorInput.hasAttribute("disabled")).toBe(true);
    expect(textInput.hasAttribute("disabled")).toBe(true);
  });

  it("should apply disabled to color input", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const colorInput = element.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    expect(colorInput.hasAttribute("disabled")).toBe(true);
  });

  it("should apply ariaLabel to color input", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    fixture.componentRef.setInput("ariaLabel", "Pick a color");
    fixture.detectChanges();

    const colorInput = element.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    expect(colorInput.getAttribute("aria-label")).toBe("Pick a color");
  });

  it("should apply name attribute to color input", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    fixture.componentRef.setInput("name", "theme-color");
    fixture.detectChanges();

    const colorInput = element.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    expect(colorInput.getAttribute("name")).toBe("theme-color");
  });

  it("should apply id attribute to color input", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    fixture.componentRef.setInput("id", "color-1");
    fixture.detectChanges();

    const colorInput = element.querySelector(
      'input[type="color"]',
    ) as HTMLInputElement;
    expect(colorInput.getAttribute("id")).toBe("color-1");
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdColorPickerComponent);
    fixture.componentRef.setInput("customClass", "custom-color-picker");
    fixture.detectChanges();

    const wrapper = element.querySelector("div") as HTMLDivElement;
    expect(wrapper.className).toContain("custom-color-picker");
  });
});
