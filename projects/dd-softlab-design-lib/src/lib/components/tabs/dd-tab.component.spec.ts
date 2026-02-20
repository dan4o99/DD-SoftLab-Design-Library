import { describe, it, expect, beforeEach } from "vitest";
import { TestBed } from "@angular/core/testing";
import { DdTabComponent } from "./dd-tab.component";

describe("DdTabComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DdTabComponent],
    }).compileComponents();
  });

  it("creates with required inputs", () => {
    const fixture = TestBed.createComponent(DdTabComponent);
    fixture.componentRef.setInput("id", "tab1");
    fixture.componentRef.setInput("label", "Tab 1");
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
