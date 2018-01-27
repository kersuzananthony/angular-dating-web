import {ChangeDetectionStrategy, Component} from "@angular/core";
import {BaseSandboxComponent} from "@shared/components/base-sandbox.component";
import {HomeSandbox} from "@app/features/home/home.sandbox";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseSandboxComponent<HomeSandbox> {

  private _registerMode = false;

  constructor(sandbox: HomeSandbox) {
    super(sandbox);
  }

  get registerMode(): boolean {
    return this._registerMode;
  }

  public toggleRegisterMode() {
    this._registerMode = !this._registerMode;
  }

  public onCancelRegister(value: boolean) {
    this._registerMode = value;
  }
}
