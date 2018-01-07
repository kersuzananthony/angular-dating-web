import {Injector} from "@angular/core";

export class ServiceLocator {

  private static _injector: Injector;

  public static getInjector(): Injector {
    return ServiceLocator._injector;
  }

  public static setInjector(injector: Injector) {
    ServiceLocator._injector = injector;
  }
}
