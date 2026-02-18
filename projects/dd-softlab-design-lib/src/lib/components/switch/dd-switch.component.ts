import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_SWITCH_CSS } from "./dd-switch.style";

@Component({
  selector: "dd-switch",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="switchClass()" [attr.style]="switchStyle()">
      <button
        class="dd-switch__button"
        type="button"
        role="switch"
        [attr.aria-checked]="isChecked()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        (click)="onToggle($event)"
      ></button>
      <span class="dd-switch__label" (click)="onToggle($event)">
        <ng-content />
      </span>
    </span>
  `,
})
export class DdSwitchComponent {
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly internalChecked = signal(false);

  readonly checked = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>("Toggle switch");
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly toggled = output<boolean>();
  readonly clicked = output<MouseEvent>();

  readonly isChecked = computed(() => this.internalChecked());

  readonly switchClass = computed(() => {
    const checkedClass = this.isChecked() ? "dd-switch--checked" : "";
    const disabledClass = this.disabled() ? "dd-switch--disabled" : "";

    return [
      "dd-switch",
      checkedClass,
      disabledClass,
      ...this.normalizedCustomClass(),
    ]
      .filter(Boolean)
      .join(" ");
  });

  readonly switchStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.dynamicStyle.loadStyle("switch", DD_SWITCH_CSS);
    effect(() => {
      this.internalChecked.set(this.checked());
    });
  }

  onToggle(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    this.clicked.emit(event);
    const nextValue = !this.isChecked();
    this.internalChecked.set(nextValue);
    this.toggled.emit(nextValue);
  }

  private normalizedCustomClass(): string[] {
    const value = this.customClass().trim();
    return value ? value.split(/\s+/) : [];
  }

  private normalizeStyleValue(
    style: string | Record<string, string | number> | null,
  ): string | null {
    if (!style) {
      return null;
    }

    if (typeof style === "string") {
      const normalized = style.trim();
      return normalized.length > 0 ? normalized : null;
    }

    const entries = Object.entries(style)
      .filter(([, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}: ${value};`);

    return entries.length > 0 ? entries.join(" ") : null;
  }
}
