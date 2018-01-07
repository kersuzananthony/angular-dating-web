import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AUTH_SERVICE, AuthServiceInterface} from "../services/auth.service";
import {MESSAGE_SERVICE, MessageServiceInterface} from "../services/message.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(AUTH_SERVICE) private _authService: AuthServiceInterface,
              @Inject(MESSAGE_SERVICE) private _messageService: MessageServiceInterface,
              private _router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._authService.isLoggedIn()) return true;

    this._messageService.error("You need to be logged in to access this area.");
    this._router.navigate(["home"]);

    return false;
  }
}
