// Import initialization first
import "./init-test-env";

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Type, Provider, EnvironmentProviders } from "@angular/core";
import { vi, expect } from "vitest";
import { DdDynamicStyleService } from "../theming/dynamic-style.service";

/**
 * Creates a mock for DdDynamicStyleService
 */
export function mockDynamicStyleService() {
  return { loadStyle: vi.fn() };
}

/**
 * Generic component setup helper that configures TestBed for standalone components
 */
export async function setupComponent<T>(
  componentType: Type<T>,
  options: {
    providers?: Array<Provider | EnvironmentProviders>;
    template?: string;
  } = {},
): Promise<{
  fixture: ComponentFixture<T>;
  component: T;
  element: HTMLElement;
}> {
  // Build the complete provider list
  const providers: Array<Provider | EnvironmentProviders> = [
    {
      provide: DdDynamicStyleService,
      useValue: mockDynamicStyleService(),
    },
    ...(options.providers || []),
  ];

  // Reset TestBed to clean state before configuring
  TestBed.resetTestingModule();

  // Configure TestBed with the component and providers
  TestBed.configureTestingModule({
    imports: [componentType],
    providers,
  });

  // Compile and create the component
  await TestBed.compileComponents();
  const fixture = TestBed.createComponent(componentType);

  return {
    fixture,
    component: fixture.componentInstance,
    element: fixture.nativeElement as HTMLElement,
  };
}

/**
 * Shared assertions for customClass and customStyle patterns
 */
export function expectCustomClassAndStyle(
  element: HTMLElement,
  customClass?: string,
  customStyle?: Record<string, string>,
) {
  if (customClass) {
    expect(element.className).toContain(customClass);
  }

  if (customStyle) {
    Object.entries(customStyle).forEach(([property, value]) => {
      expect(element.style.getPropertyValue(property)).toBe(value);
    });
  }
}

/**
 * Shared assertions for disabled state
 */
export function expectDisabledState(
  element: HTMLElement,
  disabled: boolean,
  selector: string = "[disabled]",
) {
  const targetElement = element.querySelector(selector) as HTMLElement;

  if (disabled) {
    expect(targetElement?.getAttribute("disabled")).toBe("");
    expect(targetElement?.getAttribute("aria-disabled")).toBe("true");
  } else {
    expect(targetElement?.hasAttribute("disabled")).toBe(false);
  }
}
