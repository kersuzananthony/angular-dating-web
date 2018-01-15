import {Injectable, InjectionToken} from "@angular/core";

declare let alertify: any;

export const MESSAGE_SERVICE = new InjectionToken<IMessageService>("IMessageService");

export interface IMessageService {
  confirm<T>(message: string, callback: () => T);
  success(message: string);
  error(message: string);
  warning(message: string);
  message(message: string);
}

@Injectable()
export class MessageService implements IMessageService {

  public confirm<T>(message: string, callback: () => T) {
    alertify.confirm(message, e => {
      if (e) callback();
    });
  }

  public success(message: string) {
    alertify.success(message);
  }


  public error(message: string) {
    alertify.error(message);
  }

  public warning(message: string) {
    alertify.warning(message);
  }

  public message(message: string) {
    alertify.message(message);
  }
}
