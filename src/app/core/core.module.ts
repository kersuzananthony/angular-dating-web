import {ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";
import {ApplicationHammerConfig} from "./config/application-hammer.config";

import {PreventUnsavedChangesGuard} from "./guards/prevent-unsaved-changes.guard";
import {AuthGuard} from "./guards/auth.guard";

import {AuthInterceptor} from "./services/interceptors/auth.interceptor";
import {ResponseInterceptor} from "./services/interceptors/response.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {KEY_AUTH_TOKEN, STORAGE_SERVICE, StorageService} from "./services/storage.service";
import {APPLICATION_SERVICE, ApplicationService} from "./services/application.service";
import {NETWORK_SERVICE, NetworkService} from "./services/network.service";
import {NETWORK_ERROR_HANDLER, NetworkErrorHandler} from "./services/network-error-handler.service";
import {AUTH_SERVICE, AuthService} from "./services/auth.service";
import {USER_SERVICE, UserService} from "./services/user.service";
import {MESSAGE_SERVICE, MessageService} from "./services/message.service";
import {ServiceLocator} from "../service-locator";
import {JwtModule} from "@auth0/angular-jwt";

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(ServiceLocator.getInjector().get(KEY_AUTH_TOKEN));
        },
        whitelistedDomains: ["localhost:5000"]
      }
    })
  ],
  exports: [
    HttpClientModule,
    JwtModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        PreventUnsavedChangesGuard,
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
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

  }
}
