import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import * as authActions from "./core/store/actions/auth.action";
import * as store from "./core/store";
import {Store} from "@ngrx/store";

@Injectable()
export class AppSandbox extends BaseSandbox {

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

  public onAppInit() {
    this._appState$.dispatch(new authActions.DoLoadTokenAction());
  }
}
