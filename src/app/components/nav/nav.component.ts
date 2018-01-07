import {Component, Inject, OnInit} from "@angular/core";
import {LoginRequest} from "../../models/requests/login-request.model";
import {AUTH_SERVICE, AuthServiceInterface} from "../../services/auth.service";
import {BaseComponent} from "../base.component";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent extends BaseComponent implements OnInit {

  model: LoginRequest = {};

  constructor(@Inject(AUTH_SERVICE) private _authService: AuthServiceInterface) {
    super();
  }

  ngOnInit() {
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  public login() {
    this._authService.login(this.model)
      .subscribe(
        response => this._messageService.success("You have successfully logged in."),
        error => this._messageService.error(`An error happened: ${error}`)
      );
  }

  public logout() {
    this._messageService.success("You have successfully logged out");
    this._authService.logout();
  }

  private _clearForm() {
    this.model = {};
  }
}
