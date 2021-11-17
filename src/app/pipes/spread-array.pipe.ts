import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'spreadArray',
})
export class SpreadArrayPipe implements PipeTransform {
    public transform(value: any[], ...args: unknown[]): any[] {
        return [...value];
    }
}
