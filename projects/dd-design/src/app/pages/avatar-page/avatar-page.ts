import { Component } from "@angular/core";
import {
  DdAvatarComponent,
  DdCardComponent,
  DdTabComponent,
  DdTabsComponent,
} from "@dd-softlab/dd-softlab-design-lib";

@Component({
  selector: "app-avatar-page",
  imports: [
    DdAvatarComponent,
    DdCardComponent,
    DdTabComponent,
    DdTabsComponent,
  ],
  templateUrl: "./avatar-page.html",
  styleUrl: "./avatar-page.scss",
})
export class AvatarPage {}
