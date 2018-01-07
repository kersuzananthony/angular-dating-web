import {BrowserModule} from "@angular/platform-browser";
import {Injector, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {BsDropdownModule} from "ngx-bootstrap";

import {AppComponent} from "./components/app/app.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {ModelStateErrorComponent} from "./components/model-state-error/model-state-error.component";

import {APPLICATION_SERVICE, ApplicationService} from "./services/application.service";
import {AUTH_SERVICE, AuthService} from "./services/auth.service";
import {NETWORK_SERVICE, NetworkService} from "./services/network.service";
import {KEY_AUTH_TOKEN, STORAGE_SERVICE, StorageService} from "./services/storage.service";
import {NETWORK_ERROR_HANDLER, NetworkErrorHandler} from "./services/network-error-handler.service";
import {MESSAGE_SERVICE, MessageService} from "./services/message.service";
import {ServiceLocator} from "./service-locator";

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
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(ServiceLocator.getInjector().get(KEY_AUTH_TOKEN));
        },
        whitelistedDomains: ["localhost:5000"]
      }
    }),
    BsDropdownModule.forRoot()
  ],
  providers: [
    {
      provide: KEY_AUTH_TOKEN,
      useValue: "access_token"
    },
    {
      provide: APPLICATION_SERVICE,
      useClass: ApplicationService
    },
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
    },
    {
      provide: MESSAGE_SERVICE,
      useClass: MessageService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    ServiceLocator.setInjector(injector);
  }
}
