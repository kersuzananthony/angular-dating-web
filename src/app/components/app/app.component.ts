import {Component, Inject, OnInit} from "@angular/core";
import {APPLICATION_SERVICE, ApplicationServiceInterface} from "../../services/application.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(@Inject(APPLICATION_SERVICE) private _applicationService: ApplicationServiceInterface) {}

  ngOnInit() {
    this._applicationService.initializeApplication();
  }

}
