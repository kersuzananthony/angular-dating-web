import {ModelStateError} from "@app/core/models/model-state-error.model";
import {MESSAGE_SERVICE, IMessageService} from "@app/core/services/message.service";
import {ServiceLocator} from "@app/service-locator";
import {OnDestroy} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export abstract class BaseComponent implements OnDestroy {

  private _modelStateError: ModelStateError;
  private _destroyed$ = new Subject<void>();
  get destroyed$(): Observable<void> { return this._destroyed$.asObservable(); }

  protected _subscriptions: Subscription[] = [];
  protected readonly _messageService: IMessageService;

  constructor() {
    this._messageService = ServiceLocator.getInjector().get(MESSAGE_SERVICE);
  }

  get modelStateError(): ModelStateError {
    return this._modelStateError;
  }

  public ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions = [];

    this._destroyed$.next();
    this._destroyed$.complete();
  }

  protected setModelStateError(value: ModelStateError) {
    this._modelStateError = value;
  }
}
