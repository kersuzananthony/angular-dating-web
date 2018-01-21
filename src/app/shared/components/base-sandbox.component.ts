import {BaseSandbox} from "../sandbox/base.sandbox";
import {OnDestroy, OnInit} from "@angular/core";
import {BaseComponent} from "./base.component";

export abstract class BaseSandboxComponent<TSandbox extends BaseSandbox> extends BaseComponent implements OnInit, OnDestroy {

  private readonly _sandbox: TSandbox;

  constructor(sandbox: TSandbox) {
    super();

    this._sandbox = sandbox;
  }

  get sandbox(): TSandbox {
    return this._sandbox;
  }

  public ngOnInit() {
    this._sandbox.registerEvents();
  }

  public ngOnDestroy() {
    this._sandbox.unregisterEvents();

    super.ngOnDestroy();
  }
}

