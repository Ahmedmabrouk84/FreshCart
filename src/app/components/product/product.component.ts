import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import Swal from 'sweetalert2';
import { WishListService } from '../../core/services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CurrencyPipe,TermTextPipe,SearchPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit , OnDestroy {

private readonly _ProductsService = inject(ProductsService)
private readonly _CartService = inject(CartService)
private readonly _WishListService = inject(WishListService)
WishListData:string[]=[]
WishListDataSubscription!:Subscription

    allProducts:WritableSignal<IProduct[]> = signal([])

    // textSearch:string = ""

    allProductsSubscription!:Subscription

    ngOnInit(): void {
      this.allProductsSubscription = this._ProductsService.getAllProducts().subscribe({
          next:(response)=>{
            console.log(response.data);
            this.allProducts.set(response.data)
          }
        })
    }
    ngOnDestroy(): void {
      this.allProductsSubscription.unsubscribe()
    }

    
  addToCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(response)=>{
        console.log(response);   
        this._CartService.cartNumber.set(response.numOfCartItems)
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



  addToWishList(id:string):void{
    this._WishListService.addProductToWishList(id).subscribe({
      next:(response)=>{
       this.WishListData= response.data
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

