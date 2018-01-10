import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from "@angular/platform-browser";
import {Injector, NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {BsDropdownModule, TabsModule} from "ngx-bootstrap";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./components/app/app.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {ModelStateErrorComponent} from "./components/model-state-error/model-state-error.component";
import {ListsComponent} from "./components/lists/lists.component";
import {MemberListComponent} from "./components/members/member-list/member-list.component";
import {MemberItemComponent} from "./components/members/member-item/member-item.component";
import {MemberDetailComponent} from "./components/members/member-detail/member-detail.component";
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
import {MemberDetailResolver} from "./resolvers/member-detail.resolver";
import {MemberListResolver} from "./resolvers/member-list.resolver";
import {NgxGalleryModule} from "ngx-gallery";
import {ApplicationHammerConfig} from "./config/application-hammer.config";

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
    MemberDetailComponent,
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
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [
    AuthGuard,
    MemberListResolver,
    MemberDetailResolver,
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
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ApplicationHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    ServiceLocator.setInjector(injector);
  }
}
