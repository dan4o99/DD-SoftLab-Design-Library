import { inject, Injectable, signal } from "@angular/core";
import { DdDynamicStyleService } from "../../theming/dynamic-style.service";
import { DD_TOAST_CSS } from "./dd-toast.style";

export type DdToastVariant = "info" | "success" | "warning" | "danger";
export type DdToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface DdToast {
  id: string;
  title?: string;
  message: string;
  variant: DdToastVariant;
  duration: number;
}

let _nextId = 0;

@Injectable({ providedIn: "root" })
export class DdToastService {
  readonly toasts = signal<DdToast[]>([]);

  private readonly styleService = inject(DdDynamicStyleService);

  constructor() {
    this.styleService.loadStyle("dd-toast", DD_TOAST_CSS);
  }

  show(
    message: string,
    options?: Partial<Omit<DdToast, "id" | "message">>,
  ): string {
    const id = `toast-${++_nextId}`;
    const toast: DdToast = {
      id,
      message,
      variant: options?.variant ?? "info",
      duration: options?.duration ?? 4000,
      title: options?.title,
    };
    this.toasts.update((t) => [...t, toast]);
    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }
    return id;
  }

  dismiss(id: string): void {
    this.toasts.update((t) => t.filter((x) => x.id !== id));
  }

  clear(): void {
    this.toasts.set([]);
  }
}
