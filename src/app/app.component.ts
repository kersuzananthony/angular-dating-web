import {Component, Inject, OnInit} from "@angular/core";
import {APPLICATION_SERVICE, IApplicationService} from "./core/services/application.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(@Inject(APPLICATION_SERVICE) private _applicationService: IApplicationService) {}

  ngOnInit() {
    this._applicationService.initializeApplication();
  }
}
