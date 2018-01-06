import {Component, Inject, OnInit} from "@angular/core";
import {LoginRequest} from "../../models/requests/login-request.model";
import {AUTH_SERVICE, AuthServiceInterface} from "../../services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {

  model: LoginRequest = {};

  constructor(@Inject(AUTH_SERVICE) private _authService: AuthServiceInterface) { }

  ngOnInit() {
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  public login() {
    this._authService.login(this.model)
      .subscribe(
        response => console.log(`response is ${response}`),
        error => console.log(`error is ${error}`)
      );
  }

  public logout() {
    this._authService.logout();
  }

  private _clearForm() {
    this.model = {};
  }
}
