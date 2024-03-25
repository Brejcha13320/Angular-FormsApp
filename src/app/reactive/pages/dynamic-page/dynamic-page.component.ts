import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.scss'
})
export class DynamicPageComponent {
  
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ]),
  });

  newFavoriteGameForm: FormControl = new FormControl('', [ Validators.required ])

  constructor(private fb:FormBuilder){}

  get favoriteGames(){
    return this.form.get('favoriteGames') as FormArray ;
  }

  isInvalid(control: string) {
    return this.form.get(control)?.errors && this.form.get(control)?.touched
  }

  isInvalidArray(control: string, index: number) {
    return this.form.get(control)?.get([index])?.errors && this.form.get(control)?.get([index])?.touched
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

  onAddFavoriteGame(){
   if(this.newFavoriteGameForm.invalid) return;
   const newGame = this.newFavoriteGameForm.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required))
    this.newFavoriteGameForm.reset();
  }

  onDeleteFavoriteGame(index: number){
    this.favoriteGames.removeAt(index)
  }

  onSave(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);;
    this.form.reset();
    this.favoriteGames.clear();
  }

}
