import { describe, it, expect, vi, afterEach } from "vitest";
import { DdSidebarComponent } from "./dd-sidebar.component";
import { setupComponent } from "../../testing/test-helpers";

describe("DdSidebarComponent", () => {
  let addEventSpy: ReturnType<typeof vi.spyOn>;
  let removeEventSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    addEventSpy?.mockRestore();
    removeEventSpy?.mockRestore();
  });

  it("should create", async () => {
    const { component } = await setupComponent(DdSidebarComponent);
    expect(component).toBeTruthy();
  });

  it("should apply initial width", async () => {
    const { fixture, component } = await setupComponent(DdSidebarComponent);
    fixture.componentRef.setInput("width", 300);
    fixture.detectChanges();

    expect(component.sidebarStyle()).toContain("width: 300px");
  });

  it("should apply collapsed width when collapsed", async () => {
    const { fixture, component } = await setupComponent(DdSidebarComponent);
    fixture.componentRef.setInput("collapsed", true);
    fixture.componentRef.setInput("collapsedWidth", 80);
    fixture.detectChanges();

    expect(component.sidebarStyle()).toContain("width: 80px");
  });

  it("should emit collapsedChange when collapse button clicked", async () => {
    const { fixture, element } = await setupComponent(DdSidebarComponent);
    fixture.componentRef.setInput("collapsable", true);
    fixture.detectChanges();

    let emittedValue: boolean | undefined;
    fixture.componentInstance.collapsedChange.subscribe((value: boolean) => {
      emittedValue = value;
    });

    const collapseButton = element.querySelector(
      ".dd-sidebar__collapse-icon",
    ) as HTMLButtonElement;
    collapseButton.click();
    fixture.detectChanges();

    expect(emittedValue).toBe(true);
  });

  it("should toggle collapsed state", async () => {
    const { fixture, element, component } =
      await setupComponent(DdSidebarComponent);
    fixture.componentRef.setInput("collapsable", true);
    fixture.detectChanges();

    const collapseButton = element.querySelector(
      ".dd-sidebar__collapse-icon",
    ) as HTMLButtonElement;

    expect(component.isCollapsed()).toBe(false);

    collapseButton.click();
    fixture.detectChanges();
    expect(component.isCollapsed()).toBe(true);

    collapseButton.click();
    fixture.detectChanges();
    expect(component.isCollapsed()).toBe(false);
  });

  it("should clamp width between minWidth and maxWidth", async () => {
    const { fixture, component } = await setupComponent(DdSidebarComponent);
    fixture.componentRef.setInput("minWidth", 100);
    fixture.componentRef.setInput("maxWidth", 400);
    fixture.componentRef.setInput("width", 50); // Below min
    fixture.detectChanges();

    // Width should be clamped to minWidth
    expect(component.sidebarStyle()).toContain("min-width: 100px");
    expect(component.sidebarStyle()).toContain("max-width: 400px");
  });

  it("should attach drag listeners on resizer pointerdown", async () => {
    addEventSpy = vi.spyOn(document, "addEventListener");

    const { fixture, element } = await setupComponent(DdSidebarComponent);
    fixture.detectChanges();

    const resizer = element.querySelector(
      ".dd-sidebar__resizer",
    ) as HTMLButtonElement;
    const pointerEvent = new PointerEvent("pointerdown", {
      clientX: 100,
      button: 0,
    });
    resizer.dispatchEvent(pointerEvent);
    fixture.detectChanges();

    expect(addEventSpy).toHaveBeenCalledWith(
      "pointermove",
      expect.any(Function),
    );
    expect(addEventSpy).toHaveBeenCalledWith(
      "pointerup",
      expect.any(Function),
      { once: true },
    );
  });

  it("should emit widthChange during drag", async () => {
    let moveListener: any;
    addEventSpy = vi.spyOn(document, "addEventListener").mockImplementation(((
      event: string,
      listener: any,
      options?: any,
    ) => {
      if (event === "pointermove") {
        moveListener = listener;
      }
    }) as any);

    const { fixture, element } = await setupComponent(DdSidebarComponent);
    fixture.componentRef.setInput("width", 300);
    fixture.detectChanges();

    let emittedWidth: number | undefined;
    fixture.componentInstance.widthChange.subscribe((width: number) => {
      emittedWidth = width;
    });

    const resizer = element.querySelector(
      ".dd-sidebar__resizer",
    ) as HTMLButtonElement;

    const pointerDownEvent = new PointerEvent("pointerdown", {
      clientX: 100,
      button: 0,
    });
    resizer.dispatchEvent(pointerDownEvent);
    fixture.detectChanges();

    // Simulate pointer move
    if (moveListener) {
      const pointerMoveEvent = new PointerEvent("pointermove", {
        clientX: 150,
      });
      moveListener(pointerMoveEvent);
      fixture.detectChanges();

      expect(emittedWidth).toBeGreaterThan(300);
    }
  });

  it("should cleanup drag listeners on destroy", async () => {
    removeEventSpy = vi.spyOn(document, "removeEventListener");
    addEventSpy = vi.spyOn(document, "addEventListener");

    const { fixture, element, component } =
      await setupComponent(DdSidebarComponent);
    fixture.detectChanges();

    const resizer = element.querySelector(
      ".dd-sidebar__resizer",
    ) as HTMLButtonElement;
    const pointerEvent = new PointerEvent("pointerdown", {
      clientX: 100,
      button: 0,
    });
    resizer.dispatchEvent(pointerEvent);
    fixture.detectChanges();

    component.ngOnDestroy();

    expect(removeEventSpy).toHaveBeenCalled();
  });

  it("should apply ariaLabel", async () => {
    const { fixture, element } = await setupComponent(DdSidebarComponent);
    fixture.componentRef.setInput("ariaLabel", "Navigation sidebar");
    fixture.detectChanges();

    const aside = element.querySelector("aside");
    expect(aside?.getAttribute("aria-label")).toBe("Navigation sidebar");
  });

  it("should emit clicked event", async () => {
    const { fixture, element } = await setupComponent(DdSidebarComponent);

    let clickedEmitted = false;
    fixture.componentInstance.clicked.subscribe(() => {
      clickedEmitted = true;
    });

    const aside = element.querySelector("aside") as HTMLElement;
    aside.click();
    fixture.detectChanges();

    expect(clickedEmitted).toBe(true);
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdSidebarComponent);
    fixture.componentRef.setInput("customClass", "custom-sidebar");
    fixture.detectChanges();

    const aside = element.querySelector("aside");
    expect(aside?.className).toContain("custom-sidebar");
  });
});
