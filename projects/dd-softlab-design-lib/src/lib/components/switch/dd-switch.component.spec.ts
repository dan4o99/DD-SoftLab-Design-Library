import { describe, it, expect } from "vitest";
import { DdSwitchComponent } from "./dd-switch.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdSwitchComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdSwitchComponent);
    expect(component).toBeTruthy();
  });

  it("should emit toggled on click", async () => {
    const { fixture, element } = await setupComponent(DdSwitchComponent);
    let emittedValue: boolean | undefined;

    fixture.componentInstance.toggled.subscribe((value: boolean) => {
      emittedValue = value;
    });

    const button = element.querySelector(
      'button[role="switch"]',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(emittedValue).toBe(true);
  });

  it("should apply checked state via aria-checked", async () => {
    const { fixture, element } = await setupComponent(DdSwitchComponent);
    fixture.componentRef.setInput("checked", true);
    fixture.detectChanges();

    const button = element.querySelector(
      'button[role="switch"]',
    ) as HTMLButtonElement;
    expect(button.getAttribute("aria-checked")).toBe("true");
  });

  it("should sync internal signal with checked input", async () => {
    const { fixture, component } = await setupComponent(DdSwitchComponent);
    fixture.componentRef.setInput("checked", true);
    fixture.detectChanges();

    expect(component.isChecked()).toBe(true);

    fixture.componentRef.setInput("checked", false);
    fixture.detectChanges();

    expect(component.isChecked()).toBe(false);
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdSwitchComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const button = element.querySelector(
      'button[role="switch"]',
    ) as HTMLButtonElement;
    expect(button.hasAttribute("disabled")).toBe(true);
  });

  it("should not emit toggle when disabled", async () => {
    const { fixture, element } = await setupComponent(DdSwitchComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    let toggleEmitted = false;
    fixture.componentInstance.toggled.subscribe(() => {
      toggleEmitted = true;
    });

    const button = element.querySelector(
      'button[role="switch"]',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(toggleEmitted).toBe(false);
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdSwitchComponent);
    fixture.componentRef.setInput("ariaLabel", "Enable notifications");
    fixture.detectChanges();

    const button = element.querySelector(
      'button[role="switch"]',
    ) as HTMLButtonElement;
    expect(button.getAttribute("aria-label")).toBe("Enable notifications");
  });

  it("should emit clicked event", async () => {
    const { fixture, element } = await setupComponent(DdSwitchComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const button = element.querySelector(
      'button[role="switch"]',
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdSwitchComponent);
    fixture.componentRef.setInput("customClass", "custom-switch");
    fixture.detectChanges();

    const wrapper = element.querySelector("span") as HTMLSpanElement;
    expect(wrapper.className).toContain("custom-switch");
  });
});
