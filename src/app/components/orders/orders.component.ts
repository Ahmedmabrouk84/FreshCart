import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  
  private readonly _OrderService= inject(OrderService)
  private readonly _ActivatedRoute= inject(ActivatedRoute)
  private readonly _PLATFORM_ID= inject(PLATFORM_ID)
  isLodaing:boolean= false;
  
  CartId:string |null = ''

  orders:FormGroup = new FormGroup ({
  details:new FormControl(null ,[Validators.required, Validators.pattern(/^.{3,} *$/)]),
  phone:new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null , [Validators.required , Validators.pattern(/^\w{3,}$/)]),
  })
  
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
      console.log(param);
      this.CartId = param.get('id') 
    }

  }
)

}

 orderSubmit():void{
  console.log(this.orders.value);
  this._OrderService.checkoutSession(this.CartId, this.orders.value).subscribe({

    next:(response)=>{
      console.log(response); 
      if (response.status === "success") {
        if (isPlatformBrowser(this._PLATFORM_ID)) {
          window.open(response.session.url,"_self")
        }
      }
    }
  })
 }

}
