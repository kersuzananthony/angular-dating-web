import {Component, EventEmitter, Inject, OnInit, Output} from "@angular/core";
import {BaseComponent} from "../../../../shared/components/base.component";
import {RegistrationRequest} from "../../../../core/models/requests/registration-request.model";
import {AUTH_SERVICE, IAuthService} from "../../../../core/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent extends BaseComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();

  public model: RegistrationRequest = {};

  constructor(@Inject(AUTH_SERVICE) private _authService: IAuthService) {
    super();
  }

  ngOnInit() {
  }

  public register() {
    this._clearError();
    this._authService.register(this.model)
      .subscribe(
        () => this._onRegistrationSuccess(),
        err => {
          this._messageService.error("Some errors happened during the registration.");
          this._handleError(err);
        }
      );
  }

  public cancel() {
    this._clearForm();
    this.cancelRegister.emit(false);
  }

  private _onRegistrationSuccess() {
    this._clearForm();
    this._messageService.success("You have successfully signed up!");
  }

  private _clearForm() {
    this.model = {};
  }
}
