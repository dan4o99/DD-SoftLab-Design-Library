import { describe, it, expect } from "vitest";
import { DdDatePickerComponent } from "./dd-date-picker.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdDatePickerComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdDatePickerComponent);
    expect(component).toBeTruthy();
  });

  it("should emit changed event on input", async () => {
    const { fixture, element } = await setupComponent(DdDatePickerComponent);
    let changedValue: string | undefined;

    fixture.componentInstance.changed.subscribe((value: string) => {
      changedValue = value;
    });

    const input = element.querySelector("input") as HTMLInputElement;
    input.value = "2026-02-19";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(changedValue).toBe("2026-02-19");
  });

  it("should apply value attribute", async () => {
    const { fixture, element } = await setupComponent(DdDatePickerComponent);
    fixture.componentRef.setInput("value", "2026-02-19");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("2026-02-19");
  });

  it("should apply min attribute", async () => {
    const { fixture, element } = await setupComponent(DdDatePickerComponent);
    fixture.componentRef.setInput("min", "2026-01-01");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.getAttribute("min")).toBe("2026-01-01");
  });

  it("should apply max attribute", async () => {
    const { fixture, element } = await setupComponent(DdDatePickerComponent);
    fixture.componentRef.setInput("max", "2026-12-31");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.getAttribute("max")).toBe("2026-12-31");
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdDatePickerComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.hasAttribute("disabled")).toBe(true);
  });

  it("should apply placeholder", async () => {
    const { fixture, element } = await setupComponent(DdDatePickerComponent);
    fixture.componentRef.setInput("placeholder", "Select date");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.getAttribute("placeholder")).toBe("Select date");
  });

  it("should apply label", async () => {
    const { fixture, element } = await setupComponent(DdDatePickerComponent);
    fixture.componentRef.setInput("label", "Birth date");
    fixture.detectChanges();

    const label = element.querySelector("label");
    expect(label?.textContent).toContain("Birth date");
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdDatePickerComponent);
    fixture.componentRef.setInput("customClass", "custom-date-picker");
    fixture.detectChanges();

    const wrapper = element.querySelector("div") as HTMLDivElement;
    expect(wrapper.className).toContain("custom-date-picker");
  });
});
