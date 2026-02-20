import { Component } from "@angular/core";
import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdTabsComponent } from "./dd-tabs.component";
import { DdTabComponent } from "./dd-tab.component";

@Component({
  selector: "test-tabs-host",
  standalone: true,
  imports: [DdTabsComponent, DdTabComponent],
  template: `
    <dd-tabs>
      <dd-tab id="tab1" label="Tab 1">Tab one</dd-tab>
      <dd-tab id="tab2" label="Tab 2">Tab two</dd-tab>
    </dd-tabs>
  `,
})
class TestTabsHost {}

describe("DdTabsComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdTabsComponent, DdTabComponent, TestTabsHost],
    }).compileComponents();
  });

  it("renders tab buttons from child tabs", () => {
    const fixture = TestBed.createComponent(TestTabsHost);
    fixture.detectChanges();

    const tabs = fixture.nativeElement.querySelectorAll(".dd-tabs__tab");
    expect(tabs.length).toBe(2);
  });

  it("selects a tab on click", () => {
    const fixture = TestBed.createComponent(TestTabsHost);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      ".dd-tabs__tab",
    ) as NodeListOf<HTMLButtonElement>;
    buttons[1].click();
    fixture.detectChanges();

    const active = fixture.nativeElement.querySelector(
      ".dd-tabs__tab--active",
    ) as HTMLElement;
    expect(active.textContent).toContain("Tab 2");
  });
});
