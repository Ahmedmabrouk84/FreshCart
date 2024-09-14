import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
  standalone: true
})
export class TermTextPipe implements PipeTransform {

  transform(term:string,limit:number): string {
    return term.split(" ",limit).join(" ");
  }

}
