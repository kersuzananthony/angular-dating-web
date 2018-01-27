import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import * as authActions from "./core/store/actions/auth.action";
import * as store from "./core/store";
import {Store} from "@ngrx/store";
import {ApplicationEventBus} from "@core/event-bus/application-event-bus.service";
import {Subscription} from "rxjs/Subscription";
import {isNullOrUndefined} from "util";

@Injectable()
export class AppSandbox extends BaseSandbox {

  private static readonly UPDATE_USER_KEY = "update_user_key";

  constructor(protected _appState$: Store<store.State>,
              private _applicationEventBus: ApplicationEventBus) {
    super(_appState$);
  }

  public onAppInit() {
    this._appState$.dispatch(new authActions.DoLoadTokenAction());
  }

  public registerEvents() {
    super.registerEvents();

    this._registerEvent(AppSandbox.UPDATE_USER_KEY, this._updateUserSubscription.bind(this));
  }

  private _updateUserSubscription(): Subscription {
    return this._applicationEventBus.userUpdate$.subscribe(user => {
      if (!isNullOrUndefined(user)) this._appState$.dispatch(new authActions.DoLoadUserSuccessAction(user));
    });
  }
}
