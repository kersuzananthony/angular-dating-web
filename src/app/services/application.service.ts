import {Inject, InjectionToken} from "@angular/core";
import {AUTH_SERVICE, AuthServiceInterface} from "./auth.service";

export const APPLICATION_SERVICE = new InjectionToken<ApplicationServiceInterface>("ApplicationServiceInterface");

export interface ApplicationServiceInterface {
  initializeApplication();
}

export class ApplicationService implements ApplicationServiceInterface {

  constructor(@Inject(AUTH_SERVICE) private _authService: AuthServiceInterface) {}

  public initializeApplication() {
    this._authService.initialize();
  }
}
