import {Component, Input} from "@angular/core";
import {ModelStateError} from "../../models/model-state-error.model";

@Component({
  selector: "app-model-state-error",
  templateUrl: "./model-state-error.component.html"
})
export class ModelStateErrorComponent {

  @Input() state: ModelStateError;
  @Input() key: string;

  constructor() {
  }
}
