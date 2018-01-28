import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit,
  Output
} from "@angular/core";
import {RegistrationRequest} from "@app/core/models/requests/registration-request.model";
import {BaseSandboxComponent} from "@shared/components/base-sandbox.component";
import {AuthSandbox} from "@app/features/auth/auth.sandbox";
import "rxjs/add/observable/combineLatest";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {controlMatch} from "@core/validators";
import {BsDatepickerConfig} from "ngx-bootstrap";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends BaseSandboxComponent<AuthSandbox> implements OnInit, OnDestroy {

  @Output() cancelRegister = new EventEmitter<boolean>();

  public model: RegistrationRequest = {};
  public bsConfig: Partial<BsDatepickerConfig>;
  registerForm: FormGroup;

  constructor(private _changeDetector: ChangeDetectorRef,
              private _formBuilder: FormBuilder,
              authSandbox: AuthSandbox) {
    super(authSandbox);
  }

  public ngOnInit() {
    super.ngOnInit();

    this.bsConfig = {
      containerClass: "theme-red"
    };

    this._buildForm();

    const authErrorStateSubscription = this.sandbox.authErrorState$
      .subscribe(state => {
        this.setModelStateError(state);
        this._changeDetector.markForCheck();
      });

    const registerSuccessSubscription = this.sandbox.registeredSuccess$
      .filter(success => success)
      .subscribe(() => {
        this._clearForm();
        this._changeDetector.markForCheck();
        this.cancelRegister.emit(false);
      });

    this._subscriptions.push(authErrorStateSubscription);
    this._subscriptions.push(registerSuccessSubscription);
  }

  public ngOnDestroy() {
    this.sandbox.unloadRegister();

    super.ngOnDestroy();
  }

  public register() {
    if (this.registerForm.valid) {
      this.model = Object.assign({}, this.registerForm.value);
      this.sandbox.register(this.model);
    }
  }

  public cancel() {
    this._clearForm();
    this.cancelRegister.emit(false);
  }

  private _clearForm() {
    this.model = {};
  }

  private _buildForm() {
    this.registerForm = this._formBuilder.group({
      gender: ["male"],
      username: ["", Validators.required],
      knownAs: ["", Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      password: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, {
      validator: controlMatch("password", "confirmPassword")
    });
  }
}
