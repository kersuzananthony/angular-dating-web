import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from "./components/app/app.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";

import {AUTH_SERVICE, AuthService} from "./services/auth.service";
import {NETWORK_SERVICE, NetworkService} from "./services/network.service";
import {STORAGE_SERVICE, StorageService} from "./services/storage.service";
import {NETWORK_ERROR_HANDLER, NetworkErrorHandler} from "./services/network-error-handler.service";
import {ModelStateErrorComponent} from "./components/model-state-error/model-state-error.component";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ModelStateErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: NETWORK_SERVICE,
      useClass: NetworkService
    },
    {
      provide: NETWORK_ERROR_HANDLER,
      useClass: NetworkErrorHandler
    },
    {
      provide: STORAGE_SERVICE,
      useClass: StorageService
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
