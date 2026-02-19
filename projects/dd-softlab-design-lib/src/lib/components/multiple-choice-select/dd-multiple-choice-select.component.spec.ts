import { describe, it, expect } from "vitest";
import {
  DdMultipleChoiceSelectComponent,
  MultipleChoiceOption,
} from "./dd-multiple-choice-select.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdMultipleChoiceSelectComponent", () => {
  const testOptions: MultipleChoiceOption[] = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
  ];

  it("should create", async () => {
    const { component } = await setupComponent(DdMultipleChoiceSelectComponent);
    expect(component).toBeTruthy();
  });

  it("should render options", async () => {
    const { fixture, element } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    fixture.componentRef.setInput("value", []);

    // Open dropdown first
    fixture.componentInstance.isOpen.set(true);
    fixture.detectChanges();

    const options = element.querySelectorAll(
      ".dd-multiple-choice-select__option",
    );
    expect(options.length).toBe(3);
    expect(options[0].textContent?.trim()).toContain("Option 1");
  });

  it("should toggle dropdown on click", async () => {
    const { fixture, element, component } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);

    const dropdown = element.querySelector(
      ".dd-multiple-choice-select__selected-items",
    ) as HTMLElement;
    dropdown.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);

    dropdown.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });

  it("should toggle option selection", async () => {
    const { fixture, element, component } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    component.isOpen.set(true);
    fixture.detectChanges();

    let emittedValue: string[] | undefined;
    fixture.componentInstance.changed.subscribe((value: string[]) => {
      emittedValue = value;
    });

    const checkboxes = element.querySelectorAll(
      ".dd-multiple-choice-select__checkbox",
    );
    (checkboxes[0] as HTMLInputElement).click();
    fixture.detectChanges();

    expect(emittedValue).toEqual(["1"]);
    expect(component.selectedOptions().length).toBe(1);
  });

  it("should remove selected option", async () => {
    const { fixture, element, component } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    component.toggleOption("1");
    component.toggleOption("2");
    fixture.detectChanges();

    let emittedValue: string[] | undefined;
    fixture.componentInstance.changed.subscribe((value: string[]) => {
      emittedValue = value;
    });

    const removeButtons = element.querySelectorAll(
      ".dd-multiple-choice-select__remove",
    );
    (removeButtons[0] as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(emittedValue).toEqual(["2"]);
  });

  it("should display selected options as chips", async () => {
    const { fixture, element, component } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    component.toggleOption("1");
    component.toggleOption("2");
    fixture.detectChanges();

    const chips = element.querySelectorAll(".dd-multiple-choice-select__chip");
    expect(chips.length).toBe(2);
    expect(chips[0].textContent).toContain("Option 1");
    expect(chips[1].textContent).toContain("Option 2");
  });

  it("should show placeholder when no selection", async () => {
    const { fixture, element } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    fixture.componentRef.setInput("ariaLabel", "Select items");
    fixture.detectChanges();

    const placeholder = element.querySelector(
      ".dd-multiple-choice-select__placeholder",
    );
    expect(placeholder?.textContent).toBe("Select items");
  });

  it("should close dropdown on outside click", async () => {
    const { fixture, component } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    component.isOpen.set(true);
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);

    // Simulate document click outside component
    const outsideElement = document.createElement("div");
    document.body.appendChild(outsideElement);
    const clickEvent = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(clickEvent, "target", {
      value: outsideElement,
      enumerable: true,
    });

    component.onDocumentClick(clickEvent);
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);

    document.body.removeChild(outsideElement);
  });

  it("should not toggle when disabled", async () => {
    const { fixture, element, component } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);

    const dropdown = element.querySelector(
      ".dd-multiple-choice-select__selected-items",
    ) as HTMLElement;
    dropdown.click();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
  });

  it("should not change selection when disabled", async () => {
    const { fixture, element, component } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    fixture.componentRef.setInput("disabled", true);
    component.isOpen.set(true);
    fixture.detectChanges();

    let changeEmitted = false;
    fixture.componentInstance.changed.subscribe(() => {
      changeEmitted = true;
    });

    const checkboxes = element.querySelectorAll(
      ".dd-multiple-choice-select__checkbox",
    );
    (checkboxes[0] as HTMLInputElement).click();
    fixture.detectChanges();

    expect(changeEmitted).toBe(false);
  });

  it("should apply label", async () => {
    const { fixture, element } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("label", "Select categories");
    fixture.detectChanges();

    const label = element.querySelector(".dd-multiple-choice-select__label");
    expect(label?.textContent?.trim()).toBe("Select categories");
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("customClass", "custom-select");
    fixture.detectChanges();

    const wrapper = element.querySelector(".dd-multiple-choice-select");
    expect(wrapper?.className).toContain("custom-select");
  });

  it("should emit clicked with option id", async () => {
    const { fixture, element, component } = await setupComponent(
      DdMultipleChoiceSelectComponent,
    );
    fixture.componentRef.setInput("options", testOptions);
    component.isOpen.set(true);
    fixture.detectChanges();

    let emittedId: string | undefined;
    fixture.componentInstance.clicked.subscribe((id: string) => {
      emittedId = id;
    });

    const checkboxes = element.querySelectorAll(
      ".dd-multiple-choice-select__checkbox",
    );
    (checkboxes[0] as HTMLInputElement).click();
    fixture.detectChanges();

    expect(emittedId).toBe("1");
  });
});
