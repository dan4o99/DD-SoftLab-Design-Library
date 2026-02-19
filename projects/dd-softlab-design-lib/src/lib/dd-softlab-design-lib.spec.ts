import { describe, it, expect } from "vitest";
import { DdButtonComponent } from "./components/button/dd-button.component";
import { setupComponent } from "./testing/test-helpers";

describe("DdButtonComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdButtonComponent);
    expect(component).toBeTruthy();
  });
});
