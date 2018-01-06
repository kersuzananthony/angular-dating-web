import {Component, EventEmitter, Inject, OnInit, Output} from "@angular/core";
import {RegistrationRequest} from "../../models/requests/registration-request.model";
import {AUTH_SERVICE, AuthServiceInterface} from "../../services/auth.service";
import "rxjs/add/operator/finally";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();

  public model: RegistrationRequest = {};

  constructor(@Inject(AUTH_SERVICE) private _authService: AuthServiceInterface) {
  }

  ngOnInit() {
  }

  public register() {
    this._authService.register(this.model)
      .finally(() => this._clearForm())
      .subscribe(
        () => console.log("registration successful"),
        err => console.log("An error happened")
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
