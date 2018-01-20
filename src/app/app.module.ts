import {BrowserModule} from "@angular/platform-browser";
import {Injector, NgModule} from "@angular/core";
import {CoreModule} from "@core/core.module";
import {SharedModule} from "@shared/shared.module";
import {AppRouting} from "./app.routing";

import {AppComponent} from "./app.component";

import {ServiceLocator} from "./service-locator";
import {UIKitModule} from "@shared/uikit/uikit.module";
import {ContainerModule} from "@shared/container/container.module";

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
    ContainerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    ServiceLocator.setInjector(injector);
  }
}
