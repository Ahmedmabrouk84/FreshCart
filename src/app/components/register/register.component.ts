import { NgClass } from '@angular/common';
import { Component, inject, Inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { error } from 'node:console';
import { AuthService } from '../../core/services/auth.service';
import { ErrorObserver, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  // private readonly _FormBuilder = inject(FormBuilder);
  
  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);

  msgError:string = '';
  isLodaing:boolean = false;
  registerSubscription!:Subscription

  

  
registerForms:FormGroup= new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.maxLength(20),Validators.minLength(3)]),
  email:new FormControl(null ,[Validators.required , Validators.email]),
  phone:new FormControl(null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)] ),
  password:new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
  rePassword:new FormControl(null)

} ,this.confirmPassword)


registerSubmit(){
 this.isLodaing= true;
  if (this.registerForms.valid) {

    let Data = this.registerForms.value ;
    this.registerSubscription = this._AuthService.setRegisterForm(Data).subscribe({

      next:(response)=>{
        // action ==> if Response is success it will ===> NAVEGAT TO ==> Logine  Page

        if (response.message === "success") {
          this._Router.navigate(['/login'])
        }
        this.isLodaing= false;
        console.log(response);
      },

      error:(err:HttpErrorResponse)=>{
      this.isLodaing= false;   
      },
    })
  }
  else{
    this.registerForms.setErrors({mismatch:true});
    this.registerForms.markAllAsTouched()
  }
 
}

confirmPassword (group:AbstractControl) {
  if (group.get('password')?.value === group.get('rePassword')?.value ) {
    return null
  }
  else{
    return {mismatch: true}
  }
}

ngOnDestroy(): void {
  this.registerSubscription?.unsubscribe()
}

}
