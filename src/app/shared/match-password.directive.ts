import { Directive, Input } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[matchPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true}]
})
export class MatchPasswordDirective implements Validator {
  @Input() matchPassword: string;

  validate(input: AbstractControl): {[key: string]: any} {
    if (!input.root) {
      return null;
    }
    const exactMatch = input.root.get('password').value == input.value;
    return exactMatch ? null: { mismatchedPassword: true };
  }
}
