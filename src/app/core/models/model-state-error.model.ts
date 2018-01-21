import {isNullOrUndefined} from "util";
import * as _ from "lodash";
import {flattenArray} from "@shared/helpers";

export class ModelStateError {

  private _errors: {[key: string]: string[]};

  constructor(errors: any) {
    this._errors = {};
    for (const key of Object.keys(errors)) {
      this._errors[key.toLowerCase()] = errors[key];
    }
  }

  public toString(): string {
    if (isNullOrUndefined(this._errors)) return "";

    const result = [];
    for (const value of Object.values(this._errors)) {
      result.push(value);
    }

    return flattenArray(result).join("\n");
  }

  public getAll(key: string): string {
    if (isNullOrUndefined(this._errors)) return "";

    const values = this._errors[key.toLowerCase()];
    if (isNullOrUndefined(values)) return "";

    return values.join("\n");
  }

  public getFirst(key: string): string {
    if (isNullOrUndefined(this._errors)) return "";

    const values = this._errors[key.toLowerCase()];
    if (isNullOrUndefined(values)) return "";

    return _.first(values);
  }
}
