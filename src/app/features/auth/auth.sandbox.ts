import {Injectable} from "@angular/core";
import {BaseSandbox} from "@app/shared/sandbox/base.sandbox";
import {LoginRequest} from "@app/core/models/requests/login-request.model";
import {Store} from "@ngrx/store";
import * as store from "@app/core/store";
import * as authActions from "@app/core/store/actions/auth.action";
import "rxjs/add/observable/combineLatest";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class AuthSandbox extends BaseSandbox {

  private static readonly LOGIN_FAIL_KEY = "login_fail";
  private static readonly LOGIN_SUCCESS_KEY = "login_success";

  public loginFailed$   = this._appState$.select(store.getAuthFailed);
  public loginLoaded$   = this._appState$.select(store.getAuthLoaded);
  public loginToken$    = this._appState$.select(store.getAuthToken);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(AuthSandbox.LOGIN_FAIL_KEY, this._loginFailedSubscription.bind(this));
    this._registerEvent(AuthSandbox.LOGIN_SUCCESS_KEY, this._loginSuccessSubscription.bind(this));
  }

  public login(model: LoginRequest) {
    this._appState$.dispatch(new authActions.DoLoginAction(model));
  }

  private _loginFailedSubscription(): Subscription {
    return this.loginFailed$.subscribe((failed: boolean) => {
      if (failed) this.messageService.error("Failed to login.");
    });
  }

  private _loginSuccessSubscription(): Subscription {
    return Observable.combineLatest(this.loginLoaded$, this.loginToken$)
      .filter(([loaded, token]) => loaded && !isNullOrUndefined(token))
      .subscribe(() => {
        this.messageService.success("You have successfully logged in.");
        this._router.navigate(["/members"]);
      });
  }
}
