import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'instanceOf',
})
export class InstanceOfPipe implements PipeTransform {
    public transform(value: any, className: Function): boolean {
        return value instanceof className;
    }
}
