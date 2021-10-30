import {Component, Input} from '@angular/core';
import {Chapter02Example} from '../../../models/chapter02-example';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
})
export class ExampleComponent {
    @Input() public example!: Chapter02Example;
    @Input() public exampleIndex!: number;
}
