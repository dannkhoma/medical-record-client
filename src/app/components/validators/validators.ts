import {AbstractControl, ValidationErrors} from '@angular/forms';

export class AppValidators {

  static isNumber(control: AbstractControl): ValidationErrors | null {
    if (control.value && !isNaN(control.value)) {
      return {
        isNumber: true
      };
    }
    return null;
  }


}
