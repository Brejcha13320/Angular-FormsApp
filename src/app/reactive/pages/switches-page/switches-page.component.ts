import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.scss',
})
export class SwitchesPageComponent implements OnInit {
  form: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  person = {
    gender: 'F',
    wantNotifications: false,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.reset(this.person);
  }

  isInvalid(control: string) {
    return this.form.get(control)?.errors && this.form.get(control)?.touched;
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.form.value;
    this.person = newPerson;

    console.log(this.form.value);
    console.log(this.person);
  }
}
