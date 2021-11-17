import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'reverse',
})
export class ReversePipe implements PipeTransform {
    public transform(value: any[], ...args: unknown[]): any[] {
        console.log(value);
        return value.reverse();
    }
}
