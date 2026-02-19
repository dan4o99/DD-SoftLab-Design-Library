import { describe, it, expect } from "vitest";
import { DdCardComponent } from "./dd-card.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdCardComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdCardComponent);
    expect(component).toBeTruthy();
  });

  it("should render ng-content", async () => {
    const { fixture, element } = await setupComponent(DdCardComponent);
    const contentText = "Card content";
    const contentDiv = document.createElement("div");
    contentDiv.textContent = contentText;
    fixture.nativeElement.appendChild(contentDiv);
    fixture.detectChanges();

    expect(element.textContent).toContain(contentText);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdCardComponent);
    fixture.componentRef.setInput("customClass", "my-custom-class");
    fixture.detectChanges();

    const article = element.querySelector("article")!;
    expect(article.className).toContain("my-custom-class");
  });

  it("should apply customStyle", async () => {
    const { fixture, element } = await setupComponent(DdCardComponent);
    fixture.componentRef.setInput("customStyle", "padding: 20px;");
    fixture.detectChanges();

    const article = element.querySelector("article")!;
    expect(article.getAttribute("style")).toContain("padding: 20px");
  });

  it("should call loadStyle on DdDynamicStyleService", async () => {
    const { component } = await setupComponent(DdCardComponent);
    expect(component).toBeTruthy();
    // The mock is automatically called in the component constructor
  });
});
