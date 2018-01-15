import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BaseComponent} from "../../../components/base.component";
import {LoginRequest} from "../../../../core/models/requests/login-request.model";
import {AUTH_SERVICE, IAuthService} from "../../../../core/services/auth.service";
import {Token} from "../../../../core/models/token.model";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent extends BaseComponent implements OnInit {

  model: LoginRequest = {};

  constructor(@Inject(AUTH_SERVICE) private _authService: IAuthService,
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
