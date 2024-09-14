import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnDestroy{
private readonly _AuthService= inject(AuthService)
private readonly _Router= inject(Router)
loginSubscription!:Subscription

loginForms:FormGroup = new FormGroup ({
email:new FormControl(null ,[Validators.required, Validators.email]),
password:new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
})

loginForm(){
  let data = this.loginForms.value;
  if (this.loginForms.valid) {
    
   this.loginSubscription= this._AuthService.setLoginForm(data).subscribe({
      next:(response)=>{
        if (response.message === "success") {
          let token = response.token
          localStorage.setItem('userToken',token)
          this._Router.navigate(['/home'])
          this._AuthService.saveUserData()
          // console.log(response);
        }     
      },
      
    })  
  }
  else{
    this.loginForms.markAllAsTouched()
  }
  
}
ngOnDestroy(): void {
  this.loginSubscription?.unsubscribe()
}

}
