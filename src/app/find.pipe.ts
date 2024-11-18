import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(array: any[], id: string): any {
    return array.find(item => item.id === id);
  }

}
