import { ICart } from './../../core/interfaces/icart';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit , OnDestroy{

private readonly _CartService = inject(CartService)
private readonly _ToastrService = inject(ToastrService)
  
//  detailesOfCart:ICart = {} as ICart ; 
 detailesOfCart:WritableSignal<ICart> =signal({} as ICart) ; 
 detailesOfCartSubscription!:Subscription
 checkOnBtnClear:boolean = false


  ngOnInit(): void {
    this.detailesOfCartSubscription = this._CartService.getProductsFromCart().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.detailesOfCart.set( response.data);
        if (this.detailesOfCart().totalCartPrice === 0) {
          this.checkOnBtnClear = false 
        }
        else{
          this.checkOnBtnClear = true   
        }
      },
      error:(err)=>{
        console.log(err);
      }
     })
  }
  deleteItem(id:string):void{
    this.detailesOfCartSubscription = this._CartService.deleteSpacificCartItem(id).subscribe({
      next:(response)=>{
        console.log(response.data);
        this.detailesOfCart.set(response.data);
        this._CartService.cartNumber.set(response.numOfCartItems)
        {
          Swal.fire(' Item  Deleted successfully');
        }
      },
      error:(err)=>{
        console.log(err);
      },
    })
  }
  updateCount(id:string ,count:number):void{
    if (count > 0) {
      this.detailesOfCartSubscription =  this._CartService.updateCartProductQuantity(id,count).subscribe({
        next:(response)=>{
          console.log(response);
          this.detailesOfCart.set(response.data);  
          this._ToastrService.success(`Products Of Your Cart's, Quantity is Updating`, "Fresh cart")
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
   
  }
  clearCart():void{
   this.detailesOfCartSubscription = this._CartService.clearUserCart().subscribe({
      next:(response)=>{
        console.log(response); 

        Swal.fire({
          title: "Are you sure For Clear Your Cart ?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0aad0a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Clear It"
        }).then((result) => {
          if (result.isConfirmed) {
            if (response.message ==='success') {
           
              // this.detailesOfCart = {} as ICart;
              this.detailesOfCart.set( {} as ICart);

              this.checkOnBtnClear = false;
              this._CartService.cartNumber.set(response.numOfCartItems)
            }
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
      },
      error:(err)=>{
        console.log(err);
          {
              Swal.fire('Falid To Clear Data.');
          }
      }
    })
    
  }
  ngOnDestroy(): void {
    this.detailesOfCartSubscription?.unsubscribe();
  }
}





