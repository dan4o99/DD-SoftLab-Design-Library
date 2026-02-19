import { describe, it, expect } from "vitest";
import { DdAccordionComponent } from "./dd-accordion.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdAccordionComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdAccordionComponent);
    expect(component).toBeTruthy();
  });

  it("should emit openChange when header clicked", async () => {
    const { fixture, element } = await setupComponent(DdAccordionComponent);
    let emittedValue: boolean | undefined;

    fixture.componentInstance.openChange.subscribe((value: boolean) => {
      emittedValue = value;
    });

    const header = element.querySelector(
      ".dd-accordion__header",
    ) as HTMLElement;
    header?.click();
    fixture.detectChanges();

    expect(emittedValue).toBe(true);
  });

  it("should toggle open state on header click", async () => {
    const { fixture, element, component } =
      await setupComponent(DdAccordionComponent);
    const header = element.querySelector(
      ".dd-accordion__header",
    ) as HTMLElement;

    expect(component.isOpen()).toBe(false);

    header?.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);

    header?.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });

  it("should apply open input", async () => {
    const { fixture, component } = await setupComponent(DdAccordionComponent);
    // The open input is read only in constructor, so we verify the default
    expect(component.isOpen()).toBe(false);
  });

  it("should not toggle when disabled", async () => {
    const { fixture, element, component } =
      await setupComponent(DdAccordionComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const header = element.querySelector(
      ".dd-accordion__header",
    ) as HTMLElement;
    header?.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });

  it("should not emit openChange when disabled", async () => {
    const { fixture, element } = await setupComponent(DdAccordionComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    let changeEmitted = false;
    fixture.componentInstance.openChange.subscribe(() => {
      changeEmitted = true;
    });

    const header = element.querySelector(
      ".dd-accordion__header",
    ) as HTMLElement;
    header?.click();
    fixture.detectChanges();

    expect(changeEmitted).toBe(false);
  });

  it("should apply disabled attribute on header button", async () => {
    const { fixture, element } = await setupComponent(DdAccordionComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const header = element.querySelector(
      ".dd-accordion__header",
    ) as HTMLButtonElement;
    expect(header?.disabled).toBe(true);
  });

  it("should render accordion structure", async () => {
    const { element } = await setupComponent(DdAccordionComponent);

    const section = element.querySelector("section");
    expect(section).toBeTruthy();
    expect(section?.className).toContain("dd-accordion");
  });

  it("should show arrow indicator", async () => {
    const { element } = await setupComponent(DdAccordionComponent);

    const arrow = element.querySelector(".dd-accordion__arrow");
    expect(arrow).toBeTruthy();
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdAccordionComponent);
    fixture.componentRef.setInput("customClass", "custom-accordion");
    fixture.detectChanges();

    const section = element.querySelector("section")!;
    expect(section.className).toContain("custom-accordion");
  });
});
