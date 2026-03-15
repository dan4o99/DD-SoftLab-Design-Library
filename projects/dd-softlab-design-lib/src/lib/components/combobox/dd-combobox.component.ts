import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_COMBOBOX_CSS } from "./dd-combobox.style";

export interface DdComboboxOption {
  label: string;
  value: string;
}

@Component({
  selector: "dd-combobox",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(document:click)": "onDocumentClick($event)",
  },
  template: `
    <div class="dd-combobox">
      <div class="dd-combobox__input-wrap">
        <input
          #inputEl
          class="dd-combobox__input"
          type="text"
          role="combobox"
          [attr.aria-expanded]="open()"
          [attr.aria-label]="ariaLabel()"
          [attr.placeholder]="placeholder()"
          [value]="inputValue()"
          [disabled]="disabled()"
          (input)="onInput($event)"
          (focus)="onFocus()"
          (keydown)="onKeydown($event)"
        />
        <span class="dd-combobox__chevron" aria-hidden="true">▾</span>
      </div>
      @if (open() && filteredOptions().length > 0) {
        <ul class="dd-combobox__listbox" role="listbox">
          @for (opt of filteredOptions(); track opt.value; let i = $index) {
            <li
              class="dd-combobox__option"
              [class.dd-combobox__option--focused]="i === focusedIndex()"
              [class.dd-combobox__option--selected]="opt.value === value()"
              role="option"
              [attr.aria-selected]="opt.value === value()"
              (mousedown)="selectOption(opt)"
            >
              {{ opt.label }}
            </li>
          }
        </ul>
      }
      @if (open() && filteredOptions().length === 0) {
        <ul class="dd-combobox__listbox" role="listbox">
          <li class="dd-combobox__empty">{{ emptyText() }}</li>
        </ul>
      }
    </div>
  `,
})
export class DdComboboxComponent {
  private readonly dynamicStyle = inject(DdDynamicStyleService);
  private readonly elementRef = inject(ElementRef);

  readonly options = input<DdComboboxOption[]>([]);
  readonly value = input<string>("");
  readonly placeholder = input<string>("Search…");
  readonly ariaLabel = input<string>("Combobox");
  readonly disabled = input<boolean>(false);
  readonly emptyText = input<string>("No results found");

  readonly valueChange = output<string>();

  readonly inputEl =
    viewChild.required<ElementRef<HTMLInputElement>>("inputEl");
  readonly open = signal(false);
  readonly inputValue = signal("");
  readonly focusedIndex = signal(-1);

  readonly filteredOptions = computed(() => {
    const q = this.inputValue().toLowerCase();
    return this.options().filter((o) => o.label.toLowerCase().includes(q));
  });

  constructor() {
    this.dynamicStyle.loadStyle("combobox", DD_COMBOBOX_CSS);
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.inputValue.set(val);
    this.open.set(true);
    this.focusedIndex.set(-1);
  }

  onFocus(): void {
    this.open.set(true);
  }

  onKeydown(event: KeyboardEvent): void {
    const opts = this.filteredOptions();
    const idx = this.focusedIndex();

    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.focusedIndex.set(Math.min(idx + 1, opts.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      this.focusedIndex.set(Math.max(idx - 1, 0));
    } else if (event.key === "Enter" && idx >= 0) {
      event.preventDefault();
      this.selectOption(opts[idx]);
    } else if (event.key === "Escape") {
      this.close();
    }
  }

  selectOption(opt: DdComboboxOption): void {
    this.inputValue.set(opt.label);
    this.valueChange.emit(opt.value);
    this.close();
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  private close(): void {
    this.open.set(false);
    this.focusedIndex.set(-1);
  }
}
