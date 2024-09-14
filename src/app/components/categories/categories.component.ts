import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy {

  private readonly _CategoriesService = inject(CategoriesService)
  categoriesList:WritableSignal<ICategories[]> = signal([]) 
  categoriesListSubscription!:Subscription
  
  ngOnInit(): void {
   this.categoriesListSubscription= this._CategoriesService.getAllCategories().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.categoriesList.set(response.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnDestroy(): void {
    this.categoriesListSubscription.unsubscribe()
  }
}
