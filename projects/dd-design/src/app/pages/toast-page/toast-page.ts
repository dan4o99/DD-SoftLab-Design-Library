import { Component, inject } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
  DdToastContainerComponent,
  DdToastService,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-toast-page",
  imports: [
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
    DdButtonComponent,
    DdToastContainerComponent,
  ],
  templateUrl: "./toast-page.html",
  styleUrl: "./toast-page.scss",
})
export class ToastPage {
  private readonly toastService = inject(DdToastService);

  showInfo(): void {
    this.toastService.show("File saved successfully.", {
      variant: "info",
      title: "Info",
    });
  }

  showSuccess(): void {
    this.toastService.show("Your changes were saved.", {
      variant: "success",
      title: "Success",
    });
  }

  showWarning(): void {
    this.toastService.show("Disk space is running low.", {
      variant: "warning",
      title: "Warning",
    });
  }

  showDanger(): void {
    this.toastService.show("Failed to connect to server.", {
      variant: "danger",
      title: "Error",
    });
  }
}
