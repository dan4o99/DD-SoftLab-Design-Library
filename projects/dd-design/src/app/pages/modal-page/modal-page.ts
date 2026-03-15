import { Component, signal } from "@angular/core";
import {
  DdButtonComponent,
  DdCardComponent,
  DdModalComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-modal-page",
  imports: [
    DdButtonComponent,
    DdCardComponent,
    DdModalComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./modal-page.html",
  styleUrl: "./modal-page.scss",
})
export class ModalPage {
  readonly modalOpen = signal(false);
  readonly hideCloseModalOpen = signal(false);
  readonly staticBackdropModalOpen = signal(false);

  openModal(): void {
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  openHideCloseModal(): void {
    this.hideCloseModalOpen.set(true);
  }

  closeHideCloseModal(): void {
    this.hideCloseModalOpen.set(false);
  }

  openStaticBackdropModal(): void {
    this.staticBackdropModalOpen.set(true);
  }

  closeStaticBackdropModal(): void {
    this.staticBackdropModalOpen.set(false);
  }
}
