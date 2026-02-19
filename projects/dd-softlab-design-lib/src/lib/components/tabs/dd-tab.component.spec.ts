import { describe, it, expect } from "vitest";
import { DdTabComponent } from "./dd-tab.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdTabComponent", () => {
  it("should create", async () => {
    const { fixture, component } = await setupComponent(DdTabComponent);
    fixture.componentRef.setInput("id", "tab1");
    fixture.componentRef.setInput("label", "Tab 1");
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should require id input", async () => {
    const { fixture, component } = await setupComponent(DdTabComponent);
    fixture.componentRef.setInput("id", "tab1");
    fixture.componentRef.setInput("label", "Tab 1");
    fixture.detectChanges();

    expect(component.id()).toBe("tab1");
  });

  it("should require label input", async () => {
    const { fixture, component } = await setupComponent(DdTabComponent);
    fixture.componentRef.setInput("id", "tab1");
    fixture.componentRef.setInput("label", "Tab 1");
    fixture.detectChanges();

    expect(component.label()).toBe("Tab 1");
  });

  it("should have disabled property", async () => {
    const { fixture, component } = await setupComponent(DdTabComponent);
    fixture.componentRef.setInput("id", "tab1");
    fixture.componentRef.setInput("label", "Tab 1");
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();

    expect(component.disabled()).toBe(true);
  });

  it("should default disabled to false", async () => {
    const { fixture, component } = await setupComponent(DdTabComponent);
    fixture.componentRef.setInput("id", "tab1");
    fixture.componentRef.setInput("label", "Tab 1");
    fixture.detectChanges();

    expect(component.disabled()).toBe(false);
  });

  it("should expose contentTemplate via ViewChild", async () => {
    const { fixture, component } = await setupComponent(DdTabComponent);
    fixture.componentRef.setInput("id", "tab1");
    fixture.componentRef.setInput("label", "Tab 1");
    fixture.detectChanges();

    // The contentTemplate is set via @ViewChild,
    // so it should be accessible after initialization
    expect(component.contentTemplate).toBeDefined();
  });
});
