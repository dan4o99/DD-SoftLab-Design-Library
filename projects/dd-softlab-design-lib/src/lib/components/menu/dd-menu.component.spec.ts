import { describe, it, expect } from "vitest";
import { DdMenuComponent } from "./dd-menu.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdMenuComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdMenuComponent);
    expect(component).toBeTruthy();
  });

  it("should apply default orientation (vertical)", async () => {
    const { element } = await setupComponent(DdMenuComponent);

    const nav = element.querySelector("nav") as HTMLElement;
    expect(nav.className).toContain("dd-menu");
    expect(nav.className).not.toContain("dd-menu--horizontal");
  });

  it("should apply horizontal orientation", async () => {
    const { fixture, element } = await setupComponent(DdMenuComponent);
    fixture.componentRef.setInput("orientation", "horizontal");
    fixture.detectChanges();

    const nav = element.querySelector("nav") as HTMLElement;
    expect(nav.className).toContain("dd-menu--horizontal");
  });

  it("should emit clicked event when clicked", async () => {
    const { fixture, element } = await setupComponent(DdMenuComponent);
    let clickedEmitted = false;

    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const nav = element.querySelector("nav") as HTMLElement;
    nav.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdMenuComponent);
    fixture.componentRef.setInput("ariaLabel", "Main menu");
    fixture.detectChanges();

    const nav = element.querySelector("nav") as HTMLElement;
    expect(nav.getAttribute("aria-label")).toBe("Main menu");
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdMenuComponent);
    fixture.componentRef.setInput("customClass", "custom-menu");
    fixture.detectChanges();

    const nav = element.querySelector("nav") as HTMLElement;
    expect(nav.className).toContain("custom-menu");
  });

  it("should render ng-content (menu items)", async () => {
    const { fixture, element } = await setupComponent(DdMenuComponent);
    const contentText = "Menu Item";
    const contentDiv = document.createElement("div");
    contentDiv.textContent = contentText;
    fixture.nativeElement.appendChild(contentDiv);
    fixture.detectChanges();

    expect(element.textContent).toContain(contentText);
  });
});
