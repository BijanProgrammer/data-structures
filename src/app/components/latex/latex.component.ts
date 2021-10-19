import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-latex',
    templateUrl: './latex.component.html',
    styleUrls: ['./latex.component.scss'],
})
export class LatexComponent {
    @Input() public lines: string[] = [];
}
