import {Component, EventEmitter, Inject, OnInit, Output} from "@angular/core";
import {RegistrationRequest} from "../../models/requests/registration-request.model";
import {AUTH_SERVICE, AuthServiceInterface} from "../../services/auth.service";
import {BaseComponent} from "../base.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent extends BaseComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();

  public model: RegistrationRequest = {};

  constructor(@Inject(AUTH_SERVICE) private _authService: AuthServiceInterface) {
    super();
  }

  ngOnInit() {
  }

  public register() {
    this._clearError();
    this._authService.register(this.model)
      .subscribe(
        () => this._clearForm(),
        err => this._handleError(err)
      );
  }

  public cancel() {
    this._clearForm();
    this.cancelRegister.emit(false);
  }

  private _clearForm() {
    this.model = {};
  }
}
