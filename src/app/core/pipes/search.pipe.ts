import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(ArrayOfObject:any[], wordSearch:string):any[] {
    return ArrayOfObject.filter((element)=>{
      element.title.toLowerCase().includes(wordSearch.toLowerCase())
    })

}
}