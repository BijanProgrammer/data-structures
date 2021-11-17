import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'clone',
})
export class ClonePipe implements PipeTransform {
    public transform(value: any, ...args: unknown[]): any {
        return JSON.parse(JSON.stringify(value));
    }
}
