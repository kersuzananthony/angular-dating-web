import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit,
  Output
} from "@angular/core";
import {RegistrationRequest} from "@app/core/models/requests/registration-request.model";
import {BaseSandboxComponent} from "@shared/components/base-sandbox.component";
import {AuthSandbox} from "@app/features/auth/auth.sandbox";
import "rxjs/add/observable/combineLatest";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends BaseSandboxComponent<AuthSandbox> implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();

  public model: RegistrationRequest = {};

  constructor(private _changeDetector: ChangeDetectorRef,
              authSandbox: AuthSandbox) {
    super(authSandbox);
  }

  public ngOnInit() {
    this.sandbox.authErrorState$
      .subscribe(state => {
        this.setModelStateError(state);
        this._changeDetector.markForCheck();
      });

    this.sandbox.registeredSuccess$
      .filter(success => success)
      .subscribe(() => {
        this._clearForm();
        this._changeDetector.markForCheck();
        this.cancelRegister.emit(false);
      });
  }

  public register() {
    this.sandbox.register(this.model);
  }

  public cancel() {
    this._clearForm();
    this.cancelRegister.emit(false);
  }

  private _clearForm() {
    this.model = {};
  }
}
