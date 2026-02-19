import { describe, it, expect } from "vitest";
import { DdAlertComponent } from "./dd-alert.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdAlertComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdAlertComponent);
    expect(component).toBeTruthy();
  });

  it("should apply default variant class (info)", async () => {
    const { fixture, element } = await setupComponent(DdAlertComponent);
    fixture.detectChanges();

    const div = element.querySelector("div")!;
    expect(div.className).toContain("dd-alert");
    // info variant has no extra class modifier
  });

  it("should apply success variant class", async () => {
    const { fixture, element } = await setupComponent(DdAlertComponent);
    fixture.componentRef.setInput("variant", "success");
    fixture.detectChanges();

    const div = element.querySelector("div")!;
    expect(div.className).toContain("dd-alert--success");
  });

  it("should apply warning variant class", async () => {
    const { fixture, element } = await setupComponent(DdAlertComponent);
    fixture.componentRef.setInput("variant", "warning");
    fixture.detectChanges();

    const div = element.querySelector("div")!;
    expect(div.className).toContain("dd-alert--warning");
  });

  it("should apply danger variant class", async () => {
    const { fixture, element } = await setupComponent(DdAlertComponent);
    fixture.componentRef.setInput("variant", "danger");
    fixture.detectChanges();

    const div = element.querySelector("div")!;
    expect(div.className).toContain("dd-alert--danger");
  });

  it("should apply default role attribute (status)", async () => {
    const { fixture, element } = await setupComponent(DdAlertComponent);
    fixture.detectChanges();

    const div = element.querySelector("div")!;
    expect(div.getAttribute("role")).toBe("status");
  });

  it("should apply custom role attribute", async () => {
    const { fixture, element } = await setupComponent(DdAlertComponent);
    fixture.componentRef.setInput("role", "alert");
    fixture.detectChanges();

    const div = element.querySelector("div")!;
    expect(div.getAttribute("role")).toBe("alert");
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdAlertComponent);
    fixture.componentRef.setInput("customClass", "custom-alert");
    fixture.detectChanges();

    const div = element.querySelector("div")!;
    expect(div.className).toContain("custom-alert");
  });

  it("should render content", async () => {
    const { element } = await setupComponent(DdAlertComponent);
    expect(element.querySelector("div")).toBeTruthy();
  });
});
