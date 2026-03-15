import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
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
  host: {
    "(document:click)": "onDocumentClick($event)",
  },
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
            @if (searchable()) {
              <input
                class="dd-multiple-choice-select__search"
                type="search"
                [value]="searchQuery()"
                [placeholder]="searchPlaceholder()"
                [attr.aria-label]="searchPlaceholder()"
                (input)="onSearchInput($event)"
              />
            }

            @if (filteredOptions().length === 0) {
              <div class="dd-multiple-choice-select__empty">
                No options found.
              </div>
            } @else {
              @for (option of filteredOptions(); track option.id) {
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
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class DdMultipleChoiceSelectComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly internalSelected = signal<string[]>([]);
  private readonly internalSearchQuery = signal("");

  readonly isOpen = signal(false);
  readonly options = input<MultipleChoiceOption[]>([]);
  readonly value = input<string[]>([]);
  readonly label = input<string>("");
  readonly ariaLabel = input<string>("Select multiple options");
  readonly searchable = input(false, { transform: booleanAttribute });
  readonly searchPlaceholder = input<string>("Search options");
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly changed = output<string[]>();
  readonly clicked = output<string>();

  readonly selectedOptions = computed(() =>
    this.options().filter((option) =>
      this.internalSelected().includes(option.id),
    ),
  );

  readonly searchQuery = computed(() => this.internalSearchQuery());

  readonly filteredOptions = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!this.searchable() || !query) {
      return this.options();
    }

    return this.options().filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  });

  readonly wrapperClass = computed(() =>
    ["dd-multiple-choice-select", ...this.normalizedCustomClass()].join(" "),
  );

  readonly wrapperStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle.loadStyle(
      "multiple-choice-select",
      DD_MULTIPLE_CHOICE_SELECT_CSS,
    );

    effect(() => {
      this.internalSelected.set(this.value());
    });
  }

  isSelected(optionId: string): boolean {
    return this.internalSelected().includes(optionId);
  }

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

  toggleDropdown(event?: Event): void {
    if (this.disabled()) {
      return;
    }

    event?.preventDefault();
    this.isOpen.update((open) => !open);
    if (!this.isOpen()) {
      this.internalSearchQuery.set("");
    }
  }

  removeOption(optionId: string, event?: Event): void {
    event?.stopPropagation();

    if (this.disabled()) {
      return;
    }

    const updated = this.internalSelected().filter((id) => id !== optionId);
    this.internalSelected.set(updated);
    this.changed.emit(updated);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.internalSearchQuery.set(target?.value ?? "");
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this.hostElement.nativeElement.contains(target)) {
      this.isOpen.set(false);
      this.internalSearchQuery.set("");
    }
  }

  private normalizedCustomClass(): string[] {
    return this.customClass()
      .split(" ")
      .filter((className) => className.trim().length > 0);
  }

  private normalizeStyleValue(
    value: string | Record<string, string | number> | null,
  ): string | null {
    if (!value) {
      return null;
    }

    if (typeof value === "string") {
      return value;
    }

    return Object.entries(value)
      .map(([key, currentValue]) => `${key}: ${currentValue}`)
      .join("; ");
  }
}
