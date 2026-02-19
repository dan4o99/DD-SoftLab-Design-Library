import { describe, it, expect } from "vitest";
import { Component } from "@angular/core";
import { DdTabsComponent } from "./dd-tabs.component";
import { DdTabComponent } from "./dd-tab.component";
import { setupComponent } from "../../testing/test-helpers";

// Helper component to test tabs with projected content
@Component({
  selector: "test-tabs-wrapper",
  standalone: true,
  imports: [DdTabsComponent, DdTabComponent],
  template: `
    <dd-tabs (changed)="onTabChange($event)">
      <dd-tab id="tab1" label="Tab 1">
        <p>Content 1</p>
      </dd-tab>
      <dd-tab id="tab2" label="Tab 2">
        <p>Content 2</p>
      </dd-tab>
      <dd-tab id="tab3" label="Tab 3" [disabled]="true">
        <p>Content 3</p>
      </dd-tab>
    </dd-tabs>
  `,
})
class TestTabsWrapper {
  lastChangedTab: string = "";

  onTabChange(tabId: string): void {
    this.lastChangedTab = tabId;
  }
}

describe("DdTabsComponent", () => {
  it("should create", async () => {
    const { component } = await setupComponent(DdTabsComponent);
    expect(component).toBeTruthy();
  });

  it("should render tab buttons from child tabs", async () => {
    const { fixture, element } = await setupComponent(TestTabsWrapper);
    fixture.detectChanges();
    await fixture.whenStable();

    const tabButtons = element.querySelectorAll(".dd-tabs__tab");
    expect(tabButtons.length).toBe(3);
    expect(tabButtons[0].textContent?.trim()).toBe("Tab 1");
    expect(tabButtons[1].textContent?.trim()).toBe("Tab 2");
    expect(tabButtons[2].textContent?.trim()).toBe("Tab 3");
  });

  it("should mark first tab as active by default", async () => {
    const { fixture, element } = await setupComponent(TestTabsWrapper);
    fixture.detectChanges();
    await fixture.whenStable();

    const activeTab = element.querySelector(".dd-tabs__tab--active");
    expect(activeTab?.textContent?.trim()).toBe("Tab 1");
    expect(activeTab?.getAttribute("aria-selected")).toBe("true");
  });

  it("should display active tab content", async () => {
    const { fixture, element } = await setupComponent(TestTabsWrapper);
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = element.querySelector(".dd-tabs__panel");
    expect(panel?.textContent?.trim()).toContain("Content 1");
  });

  it("should change active tab on button click", async () => {
    const { fixture, element } = await setupComponent(TestTabsWrapper);
    fixture.detectChanges();
    await fixture.whenStable();

    const tabButtons = element.querySelectorAll(".dd-tabs__tab");
    (tabButtons[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const activeTab = element.querySelector(".dd-tabs__tab--active");
    expect(activeTab?.textContent?.trim()).toBe("Tab 2");

    const panel = element.querySelector(".dd-tabs__panel");
    expect(panel?.textContent?.trim()).toContain("Content 2");
  });

  it("should emit changed event on tab selection", async () => {
    const { fixture, element } = await setupComponent(TestTabsWrapper);
    fixture.detectChanges();
    await fixture.whenStable();

    const tabButtons = element.querySelectorAll(".dd-tabs__tab");
    (tabButtons[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.lastChangedTab).toBe("tab2");
  });

  it("should not select disabled tab", async () => {
    const { fixture, element } = await setupComponent(TestTabsWrapper);
    fixture.detectChanges();
    await fixture.whenStable();

    const tabButtons = element.querySelectorAll(".dd-tabs__tab");
    const disabledTab = tabButtons[2] as HTMLButtonElement;

    expect(disabledTab.disabled).toBe(true);

    disabledTab.click();
    fixture.detectChanges();
    await fixture.whenStable();

    // Should still show first tab content
    const panel = element.querySelector(".dd-tabs__panel");
    expect(panel?.textContent?.trim()).toContain("Content 1");
    expect(fixture.componentInstance.lastChangedTab).toBe("");
  });

  it("should apply activeTab input override", async () => {
    const { fixture, element } = await setupComponent(DdTabsComponent);
    const tabsElement = element.querySelector("dd-tabs") as HTMLElement;

    // Create test tabs manually
    fixture.componentRef.setInput("activeTab", "custom-active");
    fixture.detectChanges();

    expect(fixture.componentInstance.currentActiveTab()).toBe("custom-active");
  });

  it("should apply ariaLabel to tablist", async () => {
    const { fixture, element } = await setupComponent(TestTabsWrapper);
    const tabsInstance = element.querySelector("dd-tabs");

    // Access the dd-tabs component and set input
    const tabsDebugElement = fixture.debugElement.query(
      (by) => by.nativeElement.tagName === "DD-TABS",
    );
    if (tabsDebugElement) {
      tabsDebugElement.componentInstance.ariaLabel = () => "Custom tabs";
      fixture.detectChanges();

      const tablist = element.querySelector('[role="tablist"]');
      expect(tablist?.getAttribute("aria-label")).toBe("Custom tabs");
    }
  });

  it("should apply customClass", async () => {
    const { fixture, element } = await setupComponent(DdTabsComponent);
    fixture.componentRef.setInput("customClass", "custom-tabs");
    fixture.detectChanges();

    const wrapper = element.querySelector(".dd-tabs");
    expect(wrapper?.className).toContain("custom-tabs");
  });

  it("should emit clicked event on tab button click", async () => {
    const { fixture, element } = await setupComponent(TestTabsWrapper);
    fixture.detectChanges();
    await fixture.whenStable();

    const tabsDebugElement = fixture.debugElement.query(
      (by) => by.nativeElement.tagName === "DD-TABS",
    );
    let clickedTabId: string | undefined;

    if (tabsDebugElement) {
      tabsDebugElement.componentInstance.clicked.subscribe((id: string) => {
        clickedTabId = id;
      });

      const tabButtons = element.querySelectorAll(".dd-tabs__tab");
      (tabButtons[1] as HTMLButtonElement).click();
      fixture.detectChanges();

      expect(clickedTabId).toBe("tab2");
    }
  });

  it("should handle empty tabs gracefully", async () => {
    const { component } = await setupComponent(DdTabsComponent);

    // No tabs provided
    expect(component.currentActiveTab()).toBe("");
    expect(component.activeTabTemplate()).toBeNull();
  });
});
