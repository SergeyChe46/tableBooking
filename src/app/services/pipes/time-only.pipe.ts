import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeonly',
})
export class TimeOnlyPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    let slicedTime = value.slice(0, value.length - 3);
    return slicedTime;
  }
}
