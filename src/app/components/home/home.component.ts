import {Component, OnInit} from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  private _registerMode = false;

  constructor() {
  }

  ngOnInit() {
  }

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
