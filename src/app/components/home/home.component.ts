import { Component, inject, OnDestroy, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';
import { SliderComponent } from "../slider/slider.component";
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { WishListService } from '../../core/services/wish-list.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent,RouterLink,CurrencyPipe,TermTextPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _WishListService = inject(WishListService)
 
iconColor:boolean= false;
WishListData:string[]=[]

  // productList:IProduct[]= []

  productList:WritableSignal<IProduct[]> =signal([])   

  productListSubscription!:Subscription
  WishListDataSubscription!:Subscription
  
  ngOnInit(): void {
    //  productList
    this.productListSubscription = this._ProductsService.getAllProducts().subscribe({
        next:(response)=>{
          this.productList.set(response.data);
          console.log(this.productList);
        }
      })

   this.WishListDataSubscription = this._WishListService.getProductsWishList().subscribe({
        next:(response)=>{
          console.log(response.data);
          this.WishListData=response.data.map((item:any)=>item.id)
        }
      })
 
  }

  addToCart(id:string):void{
    this.productListSubscription = this._CartService.addProductToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._CartService.cartNumber.set(response.numOfCartItems)
        // this._ToastrService.success(response.message,"Fresh Cart");
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

  ngOnDestroy(): void {
    this.productListSubscription?.unsubscribe()  
    this.WishListDataSubscription?.unsubscribe()
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
