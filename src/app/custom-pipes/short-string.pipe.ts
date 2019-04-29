import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let parts = value.toString().split('.');
    if (parts.length === 1) {
      return parts[0];
    } else {
      parts[1] += '000000';
      return parts[0] + '.' + parts[1].substring(0, 2);
    }
  }

}
