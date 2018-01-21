import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import * as store from "@core/store";
import {IMessageService, MESSAGE_SERVICE} from "@core/services/message.service";
import {Store} from "@ngrx/store";
import "rxjs/add/operator/take";
import {isNullOrUndefined} from "util";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(@Inject(MESSAGE_SERVICE) private _messageService: IMessageService,
              private _appState$: Store<store.State>,
              private _router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._appState$.select(store.getAuthToken).take(1)
      .map(token => {
        if (isNullOrUndefined(token)) {
          this._messageService.error("You need to be logged in to access this area.");
          this._router.navigate(["home"]);
        }

        return !isNullOrUndefined(token);
      });
    }
}
