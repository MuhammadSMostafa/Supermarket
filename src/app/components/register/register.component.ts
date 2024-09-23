import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly _FormBuilder = inject(FormBuilder);

  registerForm:FormGroup = this._FormBuilder.group({
    name : [null, [Validators.required , Validators.pattern(/^[A-Za-z]+([ '-][A-Za-z]+)*$/)]],
    email : [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    phoneNumber : [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password : [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    rePassword : [null, [Validators.required]],
  }, {validators : this.confirmPassword});

  confirmPassword(g:AbstractControl):object | null {
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null;
    } else{
      return {mismatch : true}
    }
  }

  register():void{

  }
}
