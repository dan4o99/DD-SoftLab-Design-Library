import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_MULTIPLE_CHOICE_SELECT_CSS } from "./dd-multiple-choice-select.style";

export interface MultipleChoiceOption {
  id: string;
  label: string;
}

@Component({
  selector: "dd-multiple-choice-select",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapperClass()" [attr.style]="wrapperStyle()">
      @if (label()) {
        <label class="dd-multiple-choice-select__label">
          {{ label() }}
        </label>
      }
      <div class="dd-multiple-choice-select__dropdown">
        <div
          class="dd-multiple-choice-select__selected-items"
          role="button"
          tabindex="0"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-expanded]="isOpen()"
          [attr.aria-disabled]="disabled()"
          (click)="toggleDropdown()"
          (keydown.enter)="toggleDropdown()"
          (keydown.space)="toggleDropdown($event)"
        >
          @if (selectedOptions().length === 0) {
            <span class="dd-multiple-choice-select__placeholder">{{
              ariaLabel()
            }}</span>
          } @else {
            @for (item of selectedOptions(); track item.id) {
              <div class="dd-multiple-choice-select__chip">
                <span>{{ item.label }}</span>
                <button
                  type="button"
                  class="dd-multiple-choice-select__remove"
                  [attr.aria-label]="'Remove ' + item.label"
                  [disabled]="disabled()"
                  (click)="removeOption(item.id, $event)"
                >
                  ×
                </button>
              </div>
            }
          }
          <span
            class="dd-multiple-choice-select__chevron"
            [class.dd-multiple-choice-select__chevron--open]="isOpen()"
            aria-hidden="true"
            >▾</span
          >
        </div>

        @if (isOpen()) {
          <div class="dd-multiple-choice-select__wrapper">
            @for (option of options(); track option.id) {
              <label class="dd-multiple-choice-select__option">
                <input
                  type="checkbox"
                  class="dd-multiple-choice-select__checkbox"
                  [checked]="isSelected(option.id)"
                  [disabled]="disabled()"
                  (change)="toggleOption(option.id)"
                />
                <span class="dd-multiple-choice-select__option-label">
                  {{ option.label }}
                </span>
              </label>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class DdMultipleChoiceSelectComponent {
  private readonly dynamicStyle: DdDynamicStyleService;
  private readonly hostElement: ElementRef<HTMLElement>;
  private readonly internalSelected = signal<string[]>([]);
  readonly isOpen = signal(false);

  readonly options = input<MultipleChoiceOption[]>([]);
  readonly value = input<string[]>([]);
  readonly label = input<string>("");
  readonly ariaLabel = input<string>("Select multiple options");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly changed = output<string[]>();
  readonly clicked = output<string>();

  readonly selectedOptions = computed(() =>
    this.options().filter((opt) => this.internalSelected().includes(opt.id)),
  );

  readonly wrapperClass = computed(() =>
    ["dd-multiple-choice-select", ...this.normalizedCustomClass()].join(" "),
  );

  readonly wrapperStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle = inject(DdDynamicStyleService);
    this.hostElement = inject(ElementRef<HTMLElement>);
    this.dynamicStyle.loadStyle(
      "multiple-choice-select",
      DD_MULTIPLE_CHOICE_SELECT_CSS,
    );
    // Initialize selected state from value input
    this.internalSelected.set(this.value());
  }

  private normalizedCustomClass(): string[] {
    return this.customClass()
      .split(" ")
      .filter((cls) => cls.trim().length > 0);
  }

  private normalizeStyleValue(
    value: string | Record<string, string | number> | null,
  ): string | null {
    if (!value) return null;
    if (typeof value === "string") return value;
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${val}`)
      .join("; ");
  }

  /** Checks if an option is currently selected. */
  isSelected(optionId: string): boolean {
    return this.internalSelected().includes(optionId);
  }

  /** Toggles the selection state of an option. */
  toggleOption(optionId: string): void {
    if (this.disabled()) {
      return;
    }

    const current = this.internalSelected();
    const updated = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    this.internalSelected.set(updated);
    this.changed.emit(updated);
    this.clicked.emit(optionId);
  }

  /** Toggles the options dropdown visibility. */
  toggleDropdown(event?: Event): void {
    if (this.disabled()) {
      return;
    }

    event?.preventDefault();
    this.isOpen.update((open) => !open);
  }

  /** Removes a selected option. */
  removeOption(optionId: string, event?: Event): void {
    event?.stopPropagation();

    if (this.disabled()) {
      return;
    }

    const updated = this.internalSelected().filter((id) => id !== optionId);
    this.internalSelected.set(updated);
    this.changed.emit(updated);
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this.hostElement.nativeElement.contains(target)) {
      this.isOpen.set(false);
    }
  }
}
