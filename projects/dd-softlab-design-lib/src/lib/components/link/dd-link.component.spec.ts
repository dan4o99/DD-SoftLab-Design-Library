import { describe, it, expect } from "vitest";
import { DdLinkComponent } from "./dd-link.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdLinkComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdLinkComponent);
    expect(component).toBeTruthy();
  });

  it("should render href attribute", async () => {
    const { fixture, element } = await setupComponent(DdLinkComponent);
    fixture.componentRef.setInput("href", "https://example.com");
    fixture.detectChanges();

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    expect(anchor.getAttribute("href")).toBe("https://example.com");
  });

  it("should render target attribute", async () => {
    const { fixture, element } = await setupComponent(DdLinkComponent);
    fixture.componentRef.setInput("target", "_blank");
    fixture.detectChanges();

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    expect(anchor.getAttribute("target")).toBe("_blank");
  });

  it("should render rel attribute", async () => {
    const { fixture, element } = await setupComponent(DdLinkComponent);
    fixture.componentRef.setInput("rel", "noopener noreferrer");
    fixture.detectChanges();

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    expect(anchor.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("should emit clicked event when clicked", async () => {
    const { fixture, element } = await setupComponent(DdLinkComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    anchor.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should call preventDefault when disabled", async () => {
    const { fixture, element } = await setupComponent(DdLinkComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    const event = new MouseEvent("click", { cancelable: true, bubbles: true });
    let preventDefaultCalled = false;
    const originalPreventDefault = event.preventDefault.bind(event);
    event.preventDefault = () => {
      preventDefaultCalled = true;
      originalPreventDefault();
    };

    anchor.dispatchEvent(event);
    fixture.detectChanges();

    expect(preventDefaultCalled).toBe(true);
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdLinkComponent);
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    expect(anchor.getAttribute("aria-disabled")).toBe("true");
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdLinkComponent);
    fixture.componentRef.setInput("customClass", "custom-link");
    fixture.detectChanges();

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    expect(anchor.className).toContain("custom-link");
  });
});
