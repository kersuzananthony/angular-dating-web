import {Component, Inject, OnInit} from "@angular/core";
import {LoginRequest} from "../../models/requests/login-request.model";
import {AUTH_SERVICE, AuthServiceInterface} from "../../services/auth.service";
import {BaseComponent} from "../base.component";
import {Token} from "../../models/token.model";
import {Router} from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent extends BaseComponent implements OnInit {

  model: LoginRequest = {};

  constructor(@Inject(AUTH_SERVICE) private _authService: AuthServiceInterface,
              private _router: Router) {
    super();
  }

  ngOnInit() {
  }

  get isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  get token(): Token {
    return this._authService.getToken();
  }

  public login() {
    this._authService.login(this.model)
      .subscribe(
        () => this._onLoginSuccess(),
        error => this._messageService.error("Failed to login.")
      );
  }

  public logout() {
    this._messageService.message("Logged out");
    this._authService.logout();
    this._router.navigate(["home"]);
  }

  private _clearForm() {
    this.model = {};
  }

  private _onLoginSuccess() {
    this._messageService.success("You have successfully logged in.");
    this._router.navigate(["members"]);
  }
}
