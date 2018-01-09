import {BrowserModule} from "@angular/platform-browser";
import {Injector, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {BsDropdownModule} from "ngx-bootstrap";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./components/app/app.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {ModelStateErrorComponent} from "./components/model-state-error/model-state-error.component";
import {ListsComponent} from "./components/lists/lists.component";
import {MemberListComponent} from "./components/members/member-list/member-list.component";
import {MemberItemComponent} from "./components/members/member-item/member-item.component";
import {MessagesComponent} from "./components/messages/messages.component";

import {APPLICATION_SERVICE, ApplicationService} from "./services/application.service";
import {AUTH_SERVICE, AuthService} from "./services/auth.service";
import {NETWORK_SERVICE, NetworkService} from "./services/network.service";
import {KEY_AUTH_TOKEN, STORAGE_SERVICE, StorageService} from "./services/storage.service";
import {NETWORK_ERROR_HANDLER, NetworkErrorHandler} from "./services/network-error-handler.service";
import {MESSAGE_SERVICE, MessageService} from "./services/message.service";
import {ServiceLocator} from "./service-locator";
import {appRouting} from "./app.routing";
import {AuthGuard} from "./guards/auth.guard";
import {USER_SERVICE, UserService} from "./services/user.service";
import {AuthInterceptor} from "./services/interceptors/auth.interceptor";
import {ResponseInterceptor} from "./services/interceptors/response.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ModelStateErrorComponent,
    ListsComponent,
    MemberListComponent,
    MemberItemComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    appRouting,
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
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
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
      provide: USER_SERVICE,
      useClass: UserService
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
