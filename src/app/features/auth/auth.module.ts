import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "@app/shared/shared.module";
import {UIKitModule} from "@app/shared/uikit/uikit.module";

import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";

import {AuthSandbox} from "./auth.sandbox";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UIKitModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    AuthSandbox
  ],
  exports: [
    RegisterComponent,
    LoginComponent
  ]
})
export class AuthModule {}
