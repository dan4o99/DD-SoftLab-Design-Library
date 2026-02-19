import { describe, it, expect } from "vitest";
import { DdInputComponent } from "./dd-input.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdInputComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdInputComponent);
    expect(component).toBeTruthy();
  });

  it("should emit valueChange on input", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    let emittedValue: string | undefined;

    fixture.componentInstance.valueChange.subscribe((value: string) => {
      emittedValue = value;
    });

    const input = element.querySelector("input") as HTMLInputElement;
    input.value = "test value";
    input.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(emittedValue).toBe("test value");
  });

  it("should apply value attribute", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("value", "initial value");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.value).toBe("initial value");
  });

  it("should apply type attribute", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("type", "email");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.getAttribute("type")).toBe("email");
  });

  it("should apply placeholder", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("placeholder", "Enter text");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.getAttribute("placeholder")).toBe("Enter text");
  });

  it("should apply name attribute", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("name", "username");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.getAttribute("name")).toBe("username");
  });

  it("should apply id attribute", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("id", "input-1");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.getAttribute("id")).toBe("input-1");
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("ariaLabel", "Username input");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.getAttribute("aria-label")).toBe("Username input");
  });

  it("should apply required attribute", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.hasAttribute("required")).toBe(true);
  });

  it("should apply readonly attribute", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("readonly", true);
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.hasAttribute("readonly")).toBe(true);
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.hasAttribute("disabled")).toBe(true);
  });

  it("should emit clicked event", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const input = element.querySelector("input") as HTMLInputElement;
    input.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdInputComponent);
    fixture.componentRef.setInput("customClass", "custom-input");
    fixture.detectChanges();

    const input = element.querySelector("input") as HTMLInputElement;
    expect(input.className).toContain("custom-input");
  });
});
