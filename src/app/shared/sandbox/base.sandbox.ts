import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import * as store from "@app/core/store";
import {IMessageService, MESSAGE_SERVICE} from "@app/core/services/message.service";
import {ServiceLocator} from "@app/service-locator";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";

export abstract class BaseSandbox {

  private _messageService: IMessageService;
  protected _router: Router;

  protected _subscriptions: Map<string, Subscription>;

  constructor(protected _appState$: Store<store.State>) {
    this._subscriptions = new Map<string, Subscription>();
    this._router = ServiceLocator.getInjector().get(Router);
  }

  get messageService(): IMessageService {
    if (isNullOrUndefined(this._messageService)) this._messageService = this._getMessageService();
    return this._messageService;
  }

  public registerEvents() {}

  public unregisterEvents() {
    if (!isNullOrUndefined(this._subscriptions)) {
      Array.from(this._subscriptions.values()).forEach(s => s.unsubscribe());
    }

    this._subscriptions = new Map<string, Subscription>();
  }

  private _getMessageService(): IMessageService {
    return ServiceLocator.getInjector().get(MESSAGE_SERVICE);
  }
}
