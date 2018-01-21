import {Component} from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {

  private _registerMode = false;

  get registerMode(): boolean {
    return this._registerMode;
  }

  public toggleRegisterMode() {
    this._registerMode = !this._registerMode;
  }

  public onCancelRegister(value: boolean) {
    this._registerMode = value;
  }
}
