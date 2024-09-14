import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService  {

 private readonly  _HttpClient = inject(HttpClient)


//  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)
 cartNumber:WritableSignal<number> =signal(0)
 
addProductToCart(id:string):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
    {
    "productId": id
   },
  )
 }
 
 getProductsFromCart():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`
 )
 }

 deleteSpacificCartItem(id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)

 }
 updateCartProductQuantity(id:string , newCount:number):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
  {
    "count": newCount,
  },
 
  )
 }
 clearUserCart():Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
)
 }

}
