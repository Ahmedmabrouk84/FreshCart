import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit ,OnDestroy{

  private readonly  _ActivatedRoute = inject(ActivatedRoute)
  private readonly  _ProductsService= inject(ProductsService)
  private readonly  _CartService= inject(CartService)
  private readonly  _ToastrService= inject(ToastrService)



  productDetails:IProduct | null = null
  productDetailsSubscription!:Subscription


  customOptionsProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    touchDrag: true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ 
      '',
      ''
    ],
    items: 1,
    nav: false
  }

  ngOnInit(): void {
    this.productDetailsSubscription = this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        console.log(p);
        let idProduct = p.get('id')
        this._ProductsService.getSpecificProduct(idProduct).subscribe({
          next:(response)=>{
            this.productDetails= response.data
            console.log( this.productDetails)
            },    

          error:(err:HttpErrorResponse)=>{
            console.log( err);
            }       
          }
        )
        }
      }
    );
  }



  addToCart(id:string):void{
    this.productDetailsSubscription =this._CartService.addProductToCart(id).subscribe({
      next:(response)=>{
        console.log(response); 
        // this._ToastrService.success(response.message,"Fresh Cart");
        this._CartService.cartNumber.set(response.numOfCartItems)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:response.message,
          showConfirmButton: false,
          timer: 1500
        });
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.productDetailsSubscription?.unsubscribe()
  }
}
