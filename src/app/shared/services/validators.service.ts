import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  };

  isFieldOneEqualFieldTwo(control1: string, control2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field1 = formGroup.get(control1)?.value;
      const field2 = formGroup.get(control2)?.value;
      if (field1 !== field2) {
        formGroup.get(control2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(control2)?.setErrors(null);
      return null;
    };
  }

  isInvalid(form: FormGroup, control: string) {
    return form.get(control)?.errors && form.get(control)?.touched;
  }
}
