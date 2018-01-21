import {ChangeDetectionStrategy, Component, OnDestroy} from "@angular/core";
import {AuthSandbox} from "../../auth.sandbox";
import {LoginRequest} from "@app/core/models/requests/login-request.model";
import {BaseSandboxComponent} from "@app/shared/components/base-sandbox.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseSandboxComponent<AuthSandbox> implements OnDestroy {

  public model: LoginRequest = {};

  constructor(authSandbox: AuthSandbox) {
    super(authSandbox);
  }

  public ngOnDestroy() {
    this.sandbox.unloadLogin();

    super.ngOnDestroy();
  }

  public login() {
    this.sandbox.login(this.model);
    this._clearForm();
  }

  private _clearForm() {
    this.model = {};
  }
}
