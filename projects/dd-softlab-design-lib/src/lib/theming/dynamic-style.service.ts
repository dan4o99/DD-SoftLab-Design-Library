import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DdDynamicStyleService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  loadStyle(id: string, cssText: string): void {
    const styleElementId = `dd-style-${id}`;
    const existing = this.document.getElementById(styleElementId);

    if (existing) {
      if (existing.textContent !== cssText) {
        existing.textContent = cssText;
      }
      return;
    }

    const styleElement = this.document.createElement("style");
    styleElement.id = styleElementId;
    styleElement.textContent = cssText;
    this.document.head.appendChild(styleElement);
  }
}
