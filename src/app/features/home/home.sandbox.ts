import {Injectable} from "@angular/core";
import {BaseSandbox} from "@shared/sandbox/base.sandbox";
import {Store} from "@ngrx/store";
import * as store from "@core/store";

@Injectable()
export class HomeSandbox extends BaseSandbox {

  public authToken$ = this._appState$.select(store.getAuthToken);

  constructor(protected _appState$: Store<store.State>) {
    super(_appState$);
  }

}
