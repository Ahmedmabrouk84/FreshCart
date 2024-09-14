import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { IUserData } from '../interfaces/iuser-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
   userData:IUserData[]=[]

  private readonly _Router = inject(Router)
  private readonly _HttpClient = inject(HttpClient)



  saveUserData():void{
    let userToken = localStorage.getItem('userToken');
    if (userToken!== null) {
     this.userData = jwtDecode(userToken);
     console.log('user data', this.userData);
    }  
  }


  setRegisterForm(data:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data) ; 
  }
  setLoginForm(data:object):Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data) ; 
  }

  setVerifyEmail(data:Object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data);
  }
  setVerifyCode(data:Object):Observable<any>{
   return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data);
  }
  setNewPassword(data:Object):Observable<any>{
   return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data);
  }
  
  logOut():void{
    localStorage.removeItem('userToken');
    this.userData = [];
    this._Router.navigate(['/login']);
  }

}
