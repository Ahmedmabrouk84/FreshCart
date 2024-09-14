import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, OnDestroy{
  private readonly _CategoriesService = inject(CategoriesService)
  
  categoriesList:WritableSignal<ICategories[]>=signal([])
  categoriestListSubscription!:Subscription;


  customOptionsMan: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    touchDrag: true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ 
      '',
      ''
    ],
    items:1 ,
    nav: true
  }
    // custom Options For Categories Slider
    
  customOptionsCategories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay:true,
    touchDrag: true,
    autoplayTimeout:1700,
    autoplayHoverPause:true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [ 
      '<i class="fa-solid fa-right-long fa-flip-horizontal"></i>',
      '<i class="fa-solid fa-right-long"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

    ngOnInit(): void {
      // List of Categories 
      this.categoriestListSubscription= this._CategoriesService.getAllCategories().subscribe({
        
        next:(response)=>{
          this.categoriesList.set( response.data)
        console.log( response.data);
        }
      }) 
    }
    ngOnDestroy(): void {
      this.categoriestListSubscription?.unsubscribe()
    }
   
}
