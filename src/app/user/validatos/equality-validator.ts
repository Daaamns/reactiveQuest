import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkEqualityValidator(
  firstControlName: string,
  secondControlName: string,
  rules: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const firstControl = formGroup.get(firstControlName);
    const secondControl = formGroup.get(secondControlName);

    if (
      firstControl &&
      secondControl &&
      firstControl.value !== secondControl.value
    ) {
      return {
        mismatch: {
          rules: rules,
        },
      };
    }
    return null;
  };
}
