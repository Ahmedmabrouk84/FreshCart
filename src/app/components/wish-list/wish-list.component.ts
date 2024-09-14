import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { IwishListProducts } from '../../core/interfaces/iwish-list-products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  private readonly _WishListService = inject(WishListService);
  WishListData:string[]=[]
  wishListList:IwishListProducts[]= []
ngOnInit(): void {
  this._WishListService.getProductsWishList().subscribe({
    next:(response)=>{
      this.wishListList = response.data;

      console.log( response.data);
      
    }
  })
}

deletFromWishList(id:string):void{
  this._WishListService.deleteProductFromWishList(id).subscribe({
    next:(response)=>{
      this.WishListData= response.data;
      
      console.log(response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title:response.message,
        showConfirmButton: false,
        timer: 1500
      }); 
    }
  })

}



}
