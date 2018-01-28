import {FormGroup, ValidatorFn} from "@angular/forms";
import {isNullOrUndefined} from "util";

export function controlMatch(firstControlName: string, secondControlName: string): ValidatorFn {
  return (formGroup: FormGroup) => {
    const first = formGroup.get(firstControlName);
    const second = formGroup.get(secondControlName);

    if (isNullOrUndefined(first || isNullOrUndefined(second))) {
      return {"controlMatch": "FormControls missing"};
    }

    return first.value === second.value ? null : {"controlMatch": "Values are different"};
  };
}
