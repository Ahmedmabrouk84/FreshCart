import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  step:number= 1;

  private readonly _FormBuilder =inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  verifyEmail:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]]
  })
  
  verifyCode:FormGroup= this._FormBuilder.group({
    resetCode:[null , [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })
  
  restePassword:FormGroup= this._FormBuilder.group({
    email:[this.verifyEmail.get('email')?.value , [Validators.required, Validators.email]],
    newPassword:[null , [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  });

  setEmailSubmit():void{

    let emailValue= this.verifyEmail.get('email')?.value;

    this.restePassword.get('email')?.patchValue(emailValue)

      this._AuthService.setVerifyEmail(this.verifyEmail.value).subscribe({        
        next:(response)=>{
          console.log(response);
          if (response.statusMsg ==='success') {
            this.step = 2;
            this._ToastrService.success(response.message,'Fresh Cart')
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
  
  setCodeSubmit():void{
      this._AuthService.setVerifyCode(this.verifyCode.value).subscribe({
        next:(response)=>{
          if (response.status ==='Success') {
            console.log(response);        
            this.step = 3;
          }
          
        }
      })
  }
  setNewPasswordSubmit():void{
      this._AuthService.setNewPassword(this.restePassword.value).subscribe({
        next:(response)=>{
          console.log(response);
          if (response.status ==='Success') {
            localStorage.setItem('userToken', response.token)
            this._AuthService.saveUserData()
           this._Router.navigate(['/home'])
          }
          
        }
      })
  }
  
}
