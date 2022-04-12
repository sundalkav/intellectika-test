import {Pipe, PipeTransform} from '@angular/core';
import {Task} from '@interfaces/task.interface';

@Pipe({name: 'appFilter'})
export class FilterPipe implements PipeTransform {

  transform(items: Task[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.task.toLocaleLowerCase().includes(searchText);
    });
  }
}
