import {Component} from '@angular/core';
import {Cell, Stack} from '../../../models/stack';

@Component({
    selector: 'app-infix-to-suffix',
    templateUrl: './infix-to-suffix.component.html',
    styleUrls: ['./infix-to-suffix.component.scss'],
})
export class InfixToSuffixComponent {
    public stack = new Stack(10, [new Cell(4), new Cell(8), new Cell(15), new Cell(16), new Cell(23), new Cell(42)]);
}
