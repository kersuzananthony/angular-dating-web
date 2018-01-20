import {Inject, InjectionToken} from "@angular/core";
import {AUTH_SERVICE, IAuthService} from "./auth.service";

export const APPLICATION_SERVICE = new InjectionToken<IApplicationService>("IApplicationService");

export interface IApplicationService {
  initializeApplication();
}

export class ApplicationService implements IApplicationService {

  constructor(@Inject(AUTH_SERVICE) private _authService: IAuthService) {}

  public initializeApplication() {
  }
}
