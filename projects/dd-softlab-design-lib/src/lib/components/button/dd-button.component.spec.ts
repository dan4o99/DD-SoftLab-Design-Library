import { describe, it, expect } from "vitest";
import { DdButtonComponent } from "./dd-button.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdButtonComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdButtonComponent);
    expect(component).toBeTruthy();
  });

  it("should apply default type (button)", async () => {
    const { element } = await setupComponent(DdButtonComponent);
    const button = element.querySelector("button");
    expect(button?.getAttribute("type")).toBe("button");
  });

  it("should apply submit type", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("type", "submit");
    fixture.detectChanges();

    const button = element.querySelector("button");
    expect(button?.getAttribute("type")).toBe("submit");
  });

  it("should apply variant class (primary)", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("variant", "primary");
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("primary");
  });

  it("should apply size class (medium)", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("size", "medium");
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("medium");
  });

  it("should apply outlined class", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("outlined", true);
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("outlined");
  });

  it("should apply text class", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("text", true);
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("text");
  });

  it("should apply raised class", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("raised", true);
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("raised");
  });

  it("should apply rounded class", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("rounded", true);
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("rounded");
  });

  it("should apply fluid class", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("fluid", true);
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("fluid");
  });

  it("should apply iconOnly class", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("iconOnly", true);
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("icon-only");
  });

  it("should show loading state", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("loading", true);
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("loading");
    expect(button.hasAttribute("disabled")).toBe(true);
  });

  it("should emit clicked event when clicked", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const button = element.querySelector("button");
    button?.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should not emit clicked when disabled", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const button = element.querySelector("button");
    button?.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(false);
  });

  it("should not emit clicked when loading", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("loading", true);
    fixture.detectChanges();

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const button = element.querySelector("button");
    button?.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(false);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdButtonComponent);
    fixture.componentRef.setInput("customClass", "custom-button");
    fixture.detectChanges();

    const button = element.querySelector("button")!;
    expect(button.className).toContain("custom-button");
  });
});
