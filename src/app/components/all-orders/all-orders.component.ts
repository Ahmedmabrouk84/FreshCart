import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { IUserData } from '../../core/interfaces/iuser-data';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {

  private readonly  _OrderService = inject(OrderService)
  private readonly  _AuthService = inject(AuthService)

    userData!:any

  ngOnInit(): void {

   this.userData =  this._AuthService.userData
    this._OrderService.getAllUserOrders(this.userData.id).subscribe({
      next:(response)=>{

      }
    })



  }
}
