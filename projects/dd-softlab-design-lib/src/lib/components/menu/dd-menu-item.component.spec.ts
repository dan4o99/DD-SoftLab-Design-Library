import { describe, it, expect } from "vitest";
import { DdMenuItemComponent } from "./dd-menu-item.component";
import { setupComponent } from "../../testing/test-helpers";
import { provideRouter } from "@angular/router";

describe("DdMenuItemComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });
    expect(component).toBeTruthy();
  });

  it("should render as anchor when href is provided", async () => {
    const { fixture, element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });
    fixture.componentRef.setInput("href", "https://example.com");
    fixture.detectChanges();

    const anchor = element.querySelector("a");
    expect(anchor).toBeTruthy();
    expect(anchor?.getAttribute("href")).toBe("https://example.com");
  });

  it("should render as anchor when routerLink is provided", async () => {
    const { fixture, element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });
    fixture.componentRef.setInput("routerLink", "/home");
    fixture.detectChanges();

    const anchor = element.querySelector("a");
    expect(anchor).toBeTruthy();
  });

  it("should always render as anchor element", async () => {
    const { element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });

    const anchor = element.querySelector("a");
    expect(anchor).toBeTruthy();
  });

  it("should apply target attribute to anchor", async () => {
    const { fixture, element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });
    fixture.componentRef.setInput("href", "https://example.com");
    fixture.componentRef.setInput("target", "_blank");
    fixture.detectChanges();

    const anchor = element.querySelector("a");
    expect(anchor?.getAttribute("target")).toBe("_blank");
  });

  it("should apply disabled attribute", async () => {
    const { fixture, element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    const anchor = element.querySelector("a");
    expect(anchor?.getAttribute("aria-disabled")).toBe("true");
  });

  it("should emit clicked event", async () => {
    const { fixture, element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    anchor.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should not emit clicked when disabled", async () => {
    const { fixture, element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    anchor.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(false);
  });

  it("should apply rel attribute", async () => {
    const { fixture, element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });
    fixture.componentRef.setInput("rel", "noopener");
    fixture.detectChanges();

    const anchor = element.querySelector("a");
    expect(anchor?.getAttribute("rel")).toBe("noopener");
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdMenuItemComponent, {
      providers: [provideRouter([])],
    });
    fixture.componentRef.setInput("customClass", "custom-menu-item");
    fixture.detectChanges();

    const anchor = element.querySelector("a") as HTMLAnchorElement;
    expect(anchor.className).toContain("custom-menu-item");
  });
});
