import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "app-value",
  templateUrl: "./value.component.html",
  styleUrls: ["./value.component.scss"]
})
export class ValueComponent implements OnInit {

  values: any[];

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
    this._http.get("http://localhost:5000/api/values").subscribe(values => this.values = <any[]>values);
  }
}
