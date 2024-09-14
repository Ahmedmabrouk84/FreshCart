import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

private readonly _HttpClient = inject(HttpClient);
private readonly _AuthService = inject(AuthService);

checkoutSession(id:string | null ,shippingDetailes:object):Observable<any>{
  return this._HttpClient.post
  (`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http:${environment.baseServerUrl}`,  
    {
      "shippingAddress": shippingDetailes
          
     },
)
}

getAllUserOrders(id:string):Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
}


}
