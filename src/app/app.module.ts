import {BrowserModule} from "@angular/platform-browser";
import {Injector, NgModule} from "@angular/core";
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./features/auth/auth.module";
import {SharedModule} from "./shared/shared.module";
import {AppRouting} from "./app.routing";

import {AppComponent} from "./app.component";

import {ServiceLocator} from "./service-locator";
import {UIKitModule} from "./shared/uikit/uikit.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    SharedModule,
    CoreModule.forRoot(),
    UIKitModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    ServiceLocator.setInjector(injector);
  }
}
