import { describe, it, expect } from "vitest";
import { DdSelectComponent } from "./dd-select.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdSelectComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdSelectComponent);
    expect(component).toBeTruthy();
  });

  it("should emit valueChange on change", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    let emittedValue: string | undefined;

    fixture.componentInstance.valueChange.subscribe((value: string) => {
      emittedValue = value;
    });

    const select = element.querySelector("select") as HTMLSelectElement;
    // Add an option so value assignment works
    const option = document.createElement("option");
    option.value = "option1";
    option.text = "Option 1";
    select.appendChild(option);
    select.value = "option1";
    select.dispatchEvent(new Event("change"));
    fixture.detectChanges();

    expect(emittedValue).toBe("option1");
  });

  it("should apply value", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    const select = element.querySelector("select") as HTMLSelectElement;
    // Add an option so value binding works
    const option = document.createElement("option");
    option.value = "option1";
    option.text = "Option 1";
    select.appendChild(option);

    fixture.componentRef.setInput("value", "option1");
    fixture.detectChanges();

    expect(select.value).toBe("option1");
  });

  it("should apply name attribute", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    fixture.componentRef.setInput("name", "category");
    fixture.detectChanges();

    const select = element.querySelector("select") as HTMLSelectElement;
    expect(select.getAttribute("name")).toBe("category");
  });

  it("should apply id attribute", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    fixture.componentRef.setInput("id", "select-1");
    fixture.detectChanges();

    const select = element.querySelector("select") as HTMLSelectElement;
    expect(select.getAttribute("id")).toBe("select-1");
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    fixture.componentRef.setInput("ariaLabel", "Category select");
    fixture.detectChanges();

    const select = element.querySelector("select") as HTMLSelectElement;
    expect(select.getAttribute("aria-label")).toBe("Category select");
  });

  it("should apply required attribute", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();

    const select = element.querySelector("select") as HTMLSelectElement;
    expect(select.hasAttribute("required")).toBe(true);
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const select = element.querySelector("select") as HTMLSelectElement;
    expect(select.hasAttribute("disabled")).toBe(true);
  });

  it("should not emit clicked when disabled", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const select = element.querySelector("select") as HTMLSelectElement;
    select.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(false);
  });

  it("should emit clicked event", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const select = element.querySelector("select") as HTMLSelectElement;
    select.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdSelectComponent);
    fixture.componentRef.setInput("customClass", "custom-select");
    fixture.detectChanges();

    const select = element.querySelector("select") as HTMLSelectElement;
    expect(select.className).toContain("custom-select");
  });
});
