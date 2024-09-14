import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterLink , RouterLinkActive],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent implements OnInit {

 readonly _AuthService = inject(AuthService);
 readonly _CartService = inject(CartService);

  navCountNumber:Signal<number> = computed(()=> this._CartService.cartNumber())


  ngOnInit(): void {
  this._CartService.getProductsFromCart().subscribe({
    next:(response)=>{
      this._CartService.cartNumber.set(response.numOfCartItems)

    }
  }
)
  }


}
