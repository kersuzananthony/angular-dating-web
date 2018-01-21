import {Injectable} from "@angular/core";
import {BaseSandbox} from "@app/shared/sandbox/base.sandbox";
import {LoginRequest} from "@app/core/models/requests/login-request.model";
import {Store} from "@ngrx/store";
import * as store from "@app/core/store";
import * as authActions from "@app/core/store/actions/auth.action";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {Subscription} from "rxjs/Subscription";
import {RegistrationRequest} from "@core/models/requests/registration-request.model";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/combineLatest";

@Injectable()
export class AuthSandbox extends BaseSandbox {

  private static readonly LOGIN_FAIL_KEY = "login_fail";
  private static readonly LOGIN_SUCCESS_KEY = "login_success";
  private static readonly REGISTER_FAIL_KEY = "register_fail_key";
  private static readonly REGISTER_SUCCESS_KEY = "register_success_key";

  public loginFailed$       = this._appState$.select(store.getAuthFailed);
  public loginLoaded$       = this._appState$.select(store.getAuthLoaded);
  public loginToken$        = this._appState$.select(store.getAuthToken);
  public registeredSuccess$ = this._appState$.select(store.getAuthRegistered);
  public registeredFailed$  = this._appState$.select(store.getAuthRegisterFailed);
  public authErrorMessage$  = this._appState$.select(store.getAuthErrorMessage);
  public authErrorState$    = this._appState$.select(store.getAuthErrorState);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(AuthSandbox.LOGIN_FAIL_KEY, this._loginFailedSubscription.bind(this));
    this._registerEvent(AuthSandbox.LOGIN_SUCCESS_KEY, this._loginSuccessSubscription.bind(this));
    this._registerEvent(AuthSandbox.REGISTER_FAIL_KEY, this._registerFailSubscription.bind(this));
    this._registerEvent(AuthSandbox.REGISTER_SUCCESS_KEY, this._registerSuccessSubscription.bind(this));
  }

  public login(model: LoginRequest) {
    this._appState$.dispatch(new authActions.DoLoginAction(model));
  }

  public register(model: RegistrationRequest) {
    this._appState$.dispatch(new authActions.DoRegisterAction(model));
  }

  public unloadRegister() {
    this._appState$.dispatch(new authActions.DoUnloadRegisterAction());
  }

  public unloadLogin() {
    this._appState$.dispatch(new authActions.DoUnloadLogin());
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

  private _registerSuccessSubscription(): Subscription {
    return this.registeredSuccess$
      .filter(registered => registered)
      .subscribe(() => this.messageService.success("You have successfully signed up!"));
  }

  private _registerFailSubscription(): Subscription {
    return Observable.combineLatest(this.registeredFailed$, this.authErrorMessage$)
      .filter(([failed, errorMessage]) => failed)
      .map(([failed, errorMessage]) => errorMessage)
      .subscribe(errorMessage => {
        this.messageService.error(!!errorMessage ? errorMessage : "Some errors happened during the registration.");
      });
  }
}
