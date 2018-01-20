import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MessagesRouting} from "./messages.routing";
import {MessagesComponent} from "./components/messages/messages.component";
import {SharedModule} from "@shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MessagesRouting
  ],
  declarations: [
    MessagesComponent
  ]
})
export class MessagesModule {}
