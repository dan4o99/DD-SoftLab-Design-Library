import { describe, it, expect, vi } from "vitest";
import { DdDynamicStyleService } from "./dynamic-style.service";

describe("DdDynamicStyleService", () => {
  it("should create", () => {
    const mockDocument = {
      getElementById: vi.fn(),
      createElement: vi.fn(),
      head: {
        appendChild: vi.fn(),
      },
    } as unknown as Document;
    const service = new DdDynamicStyleService(mockDocument);
    expect(service).toBeTruthy();
  });

  it("should create style element with correct id and css text", () => {
    const mockStyleElement = { id: "", textContent: "" };
    const mockDocument: any = {
      getElementById: vi.fn().mockReturnValue(null),
      createElement: vi.fn().mockReturnValue(mockStyleElement),
      head: {
        appendChild: vi.fn(),
      },
    };

    const service = new DdDynamicStyleService(mockDocument);
    const cssText = "body { color: red; }";
    service.loadStyle("test", cssText);

    expect(mockDocument.createElement).toHaveBeenCalledWith("style");
    expect(mockStyleElement.id).toBe("dd-style-test");
    expect(mockStyleElement.textContent).toBe(cssText);
    expect(mockDocument.head.appendChild).toHaveBeenCalledWith(
      mockStyleElement,
    );
  });
});
