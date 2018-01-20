import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AUTH_SERVICE, IAuthService} from "../services/auth.service";
import {MESSAGE_SERVICE, IMessageService} from "../services/message.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(AUTH_SERVICE) private _authService: IAuthService,
              @Inject(MESSAGE_SERVICE) private _messageService: IMessageService,
              private _router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return true;

    // this._messageService.error("You need to be logged in to access this area.");
    // this._router.navigate(["home"]);
    //
    // return false;
  }
}
