import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, OnDestroy {

  readonly _BrandsService =inject(BrandsService)

  brandsList:WritableSignal<IBrand[]>=signal([])
  brandsListSubscription!:Subscription

  ngOnInit(): void {
   this.brandsListSubscription = this._BrandsService.getAllBrands().subscribe({

      next:(response)=>{
          console.log(response.data);
          this.brandsList.set(response.data);
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
      },
    })
  }

  ngOnDestroy(): void {
  this.brandsListSubscription.unsubscribe()  
  }
}

