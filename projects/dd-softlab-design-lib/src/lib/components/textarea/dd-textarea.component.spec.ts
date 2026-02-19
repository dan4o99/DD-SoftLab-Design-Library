import { describe, it, expect } from "vitest";
import { DdTextareaComponent } from "./dd-textarea.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdTextareaComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdTextareaComponent);
    expect(component).toBeTruthy();
  });

  it("should emit valueChange on input", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    let emittedValue: string | undefined;

    fixture.componentInstance.valueChange.subscribe((value: string) => {
      emittedValue = value;
    });

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    textarea.value = "test text";
    textarea.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(emittedValue).toBe("test text");
  });

  it("should apply value", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("value", "initial text");
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.value).toBe("initial text");
  });

  it("should apply placeholder", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("placeholder", "Enter description");
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.getAttribute("placeholder")).toBe("Enter description");
  });

  it("should apply rows attribute", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("rows", 5);
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.getAttribute("rows")).toBe("5");
  });

  it("should apply name attribute", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("name", "description");
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.getAttribute("name")).toBe("description");
  });

  it("should apply id attribute", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("id", "textarea-1");
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.getAttribute("id")).toBe("textarea-1");
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("ariaLabel", "Description textarea");
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.getAttribute("aria-label")).toBe("Description textarea");
  });

  it("should apply required attribute", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.hasAttribute("required")).toBe(true);
  });

  it("should apply readonly attribute", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("readonly", true);
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.hasAttribute("readonly")).toBe(true);
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.hasAttribute("disabled")).toBe(true);
  });

  it("should emit clicked event", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    textarea.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdTextareaComponent);
    fixture.componentRef.setInput("customClass", "custom-textarea");
    fixture.detectChanges();

    const textarea = element.querySelector("textarea") as HTMLTextAreaElement;
    expect(textarea.className).toContain("custom-textarea");
  });
});
