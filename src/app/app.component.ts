import {Component, OnInit} from "@angular/core";
import {AppSandbox} from "./app.sandbox";
import {BaseSandboxComponent} from "./shared/components/base-sandbox.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AppSandbox]
})
export class AppComponent extends BaseSandboxComponent<AppSandbox> implements OnInit {

  constructor(appSandbox: AppSandbox) {
    super(appSandbox);
  }

  ngOnInit() {
    this.sandbox.onAppInit();
  }
}
