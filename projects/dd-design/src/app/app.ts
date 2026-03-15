import { Component, computed, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import {
  ColorSchemeName,
  DdDropdownComponent,
  DdMenuComponent,
  DdMenuItemComponent,
  DdSwitchComponent,
  DdSidebarComponent,
  DdThemeService,
  ThemeDefinition,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    DdMenuComponent,
    DdMenuItemComponent,
    DdDropdownComponent,
    DdSwitchComponent,
    DdSidebarComponent,
  ],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  private readonly themeService: DdThemeService = inject(DdThemeService);
  private readonly sidebarCollapsedWidth = 72;

  readonly themes = this.themeService.listThemes();
  readonly schemes = this.themeService.listSchemes().map((scheme) => ({
    name: scheme,
    label: scheme === "light" ? "Light" : "Dark",
  }));
  readonly activeTheme = this.themeService.activeTheme;
  readonly tokenPreview = computed(() =>
    Object.entries(this.activeTheme().tokens),
  );
  readonly sidebarWidth = signal(260);
  readonly sidebarCollapsed = signal(false);
  readonly sidebarEffectiveWidth = computed(() =>
    this.sidebarCollapsed() ? this.sidebarCollapsedWidth : this.sidebarWidth(),
  );

  constructor() {
    // no persisted sidebar state
  }

  switchTheme(theme: ThemeDefinition): void {
    this.themeService.setTheme(theme.name);
  }

  switchScheme(scheme: ColorSchemeName): void {
    this.themeService.setScheme(scheme);
  }

  onThemeChange(themeName: string): void {
    const theme = this.themes.find((item) => item.name === themeName);
    if (theme) {
      this.switchTheme(theme);
    }
  }

  onSchemeChange(scheme: string): void {
    if (scheme === "light" || scheme === "dark") {
      this.switchScheme(scheme);
    }
  }

  onSchemeToggle(isDark: boolean): void {
    this.switchScheme(isDark ? "dark" : "light");
  }

  toggleSidebar(): void {
    const nextValue = !this.sidebarCollapsed();
    this.sidebarCollapsed.set(nextValue);
  }

  onSidebarWidthChange(width: number): void {
    this.sidebarWidth.set(width);
  }

  onSidebarCollapsedChange(collapsed: boolean): void {
    this.sidebarCollapsed.set(collapsed);
  }
}
