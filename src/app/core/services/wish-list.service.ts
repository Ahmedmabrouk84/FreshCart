import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

 private readonly _HttpClient = inject(HttpClient)

//  /api/v1/wishlist


addProductToWishList(id:string):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,{
    "productId": id
  })
}
deleteProductFromWishList(id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
}
getProductsWishList():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
}

}
