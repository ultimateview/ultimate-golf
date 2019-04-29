import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yardsLabel'
})
export class YardsLabelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let parts = value.toString().split('.');
    return parts[0] + ' yds';
  }

}
