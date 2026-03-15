import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_DROPDOWN_CSS } from "./dd-dropdown.style";

export interface DdDropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: "dd-dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:click)": "onDocumentClick($event)",
    "(keydown.escape)": "closeSearchablePanel()",
  },
  template: `
    @if (searchable()) {
      <div class="dd-dropdown-searchable" [attr.style]="dropdownStyle()">
        <button
          type="button"
          [class]="dropdownClass() + ' dd-dropdown__trigger'"
          [disabled]="disabled()"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-expanded]="isOpen()"
          aria-haspopup="listbox"
          (click)="toggleSearchablePanel($event)"
        >
          <span class="dd-dropdown__trigger-label">{{ selectedLabel() }}</span>
          <span
            class="dd-dropdown__chevron"
            [class.dd-dropdown__chevron--open]="isOpen()"
            >▾</span
          >
        </button>

        @if (isOpen()) {
          <div class="dd-dropdown__panel" role="listbox">
            <input
              class="dd-dropdown__search"
              type="search"
              [value]="searchQuery()"
              [placeholder]="searchPlaceholder()"
              [attr.aria-label]="searchPlaceholder()"
              (input)="onSearchInput($event)"
            />

            @if (filteredOptions().length === 0) {
              <div class="dd-dropdown__empty">No options found.</div>
            } @else {
              @for (option of filteredOptions(); track option.value) {
                <button
                  type="button"
                  class="dd-dropdown__option"
                  [class.dd-dropdown__option--selected]="
                    option.value === value()
                  "
                  [disabled]="option.disabled ? true : null"
                  (click)="selectOption(option.value)"
                >
                  {{ option.label }}
                </button>
              }
            }
          </div>
        }
      </div>
    } @else {
      <select
        [class]="dropdownClass()"
        [attr.style]="dropdownStyle()"
        [value]="value()"
        [attr.name]="name()"
        [attr.id]="id()"
        [required]="required()"
        [disabled]="disabled()"
        [attr.aria-label]="ariaLabel()"
        (change)="onChange($event)"
        (click)="onClick($event)"
      >
        <ng-content />
      </select>
    }
  `,
})
export class DdDropdownComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly internalSearchQuery = signal("");

  readonly value = input<string>("");
  readonly name = input<string>("");
  readonly id = input<string>("");
  readonly ariaLabel = input<string>("");
  readonly options = input<DdDropdownOption[]>([]);
  readonly searchable = input(false, { transform: booleanAttribute });
  readonly placeholder = input<string>("Select an option");
  readonly searchPlaceholder = input<string>("Search options");
  readonly required = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly customClass = input<string>("");
  readonly customStyle = input<string | Record<string, string | number> | null>(
    null,
  );

  readonly valueChange = output<string>();
  readonly itemSelected = output<string>();
  readonly clicked = output<MouseEvent>();
  readonly isOpen = signal(false);

  readonly searchQuery = computed(() => this.internalSearchQuery());

  readonly filteredOptions = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) {
      return this.options();
    }

    return this.options().filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  });

  readonly selectedOption = computed(
    () =>
      this.options().find((option) => option.value === this.value()) ?? null,
  );

  readonly selectedLabel = computed(
    () => this.selectedOption()?.label ?? this.placeholder(),
  );

  readonly dropdownClass = computed(() =>
    ["dd-dropdown", ...this.normalizedCustomClass()].join(" "),
  );

  readonly dropdownStyle = computed(() =>
    this.normalizeStyleValue(this.customStyle()),
  );

  constructor() {
    this.dynamicStyle.loadStyle("dropdown", DD_DROPDOWN_CSS);

    effect(() => {
      if (!this.searchable()) {
        this.closeSearchablePanel();
      }
    });
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? "";

    this.valueChange.emit(value);
    this.itemSelected.emit(value);
  }

  onClick(event: MouseEvent): void {
    if (this.disabled()) {
      return;
    }

    this.clicked.emit(event);
  }

  toggleSearchablePanel(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.clicked.emit(event);
    this.isOpen.update((open) => !open);
    if (!this.isOpen()) {
      this.internalSearchQuery.set("");
    }
  }

  selectOption(value: string): void {
    this.valueChange.emit(value);
    this.itemSelected.emit(value);
    this.closeSearchablePanel();
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.internalSearchQuery.set(target?.value ?? "");
  }

  closeSearchablePanel(): void {
    this.isOpen.set(false);
    this.internalSearchQuery.set("");
  }

  onDocumentClick(event: MouseEvent): void {
    if (
      this.searchable() &&
      this.isOpen() &&
      !this.hostElement.nativeElement.contains(event.target as Node)
    ) {
      this.closeSearchablePanel();
    }
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
