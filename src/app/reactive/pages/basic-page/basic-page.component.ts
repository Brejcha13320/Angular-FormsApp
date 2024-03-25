import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX5090',
  price: 2500,
  inStorage: 6
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.scss'
})
export class BasicPageComponent implements OnInit {

  // form: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)] ],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  })

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    // this.form.reset(rtx5090)
  }

  isInvalid(control: string) {
    return this.form.get(control)?.errors && this.form.get(control)?.touched
  }

  getErrorMessage(control: string): string | null{

    if(!this.form.contains(control)) return null;

    const errors = this.form.get(control)?.errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Este campo requiere mínimo ${ errors['minlength'].requiredLength } caracteres`;
      }
    }
    return null;
  }

  onSave(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    };

    console.log(this.form.value);

    this.form.reset({
      price: 0,
      inStorage: 0
    })
  }

}
