import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'toCharArray',
})
export class ToCharArrayPipe implements PipeTransform {
    public transform(value: string, ...args: unknown[]): string[] {
        return value.split('');
    }
}
