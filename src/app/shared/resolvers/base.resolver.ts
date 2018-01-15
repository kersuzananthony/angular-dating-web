import {MESSAGE_SERVICE, IMessageService} from "../../core/services/message.service";
import {ServiceLocator} from "../../service-locator";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";

export abstract class BaseResolver {

  protected _messageService: IMessageService;
  protected _router: Router;

  constructor() {
    this._messageService = ServiceLocator.getInjector().get(MESSAGE_SERVICE);
    this._router = ServiceLocator.getInjector().get(Router);
  }

  protected _handleError(message: string, routeToRedirect?: string): Observable<any> {
    this._messageService.error(message);
    if (!isNullOrUndefined(routeToRedirect)) this._router.navigate([routeToRedirect]);
    return Observable.of(null);
  }
}
