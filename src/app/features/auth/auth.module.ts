import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {UIKitModule} from "../../shared/uikit/uikit.module";

import {RegisterComponent} from "./components/register/register.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UIKitModule
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ]
})
export class AuthModule {}
