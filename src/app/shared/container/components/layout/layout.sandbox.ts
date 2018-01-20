import {Inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AUTH_SERVICE, IAuthService} from "@app/core/services/auth.service";
import {BaseSandbox} from "@app/shared/sandbox/base.sandbox";
import * as authActions from "@app/core/store/actions/auth.action";
import * as store from "@app/core/store";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class LayoutSandbox extends BaseSandbox {

  private static readonly TOKEN_UPDATE_KEY = "token_update";

  public authToken$ = this._appState$.select(store.getAuthToken);

  constructor(@Inject(AUTH_SERVICE) private _authService: IAuthService,
              protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    if (!this._subscriptions.has(LayoutSandbox.TOKEN_UPDATE_KEY)) {
      this._subscriptions.set(LayoutSandbox.TOKEN_UPDATE_KEY, this._tokenUpdateSubscription());
    }
  }

  public logout() {
    this._appState$.dispatch(new authActions.DoLogoutAction());
  }

  private _tokenUpdateSubscription(): Subscription {
    return this.authToken$.subscribe(token => {
      if (isNullOrUndefined(token)) {
        this.messageService.message("Logged out");
        this._router.navigate(["/home"]);
      }
    });
  }
}
