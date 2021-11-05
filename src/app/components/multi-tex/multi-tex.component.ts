import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-latex',
    templateUrl: './multi-tex.component.html',
    styleUrls: ['./multi-tex.component.scss'],
})
export class MultiTexComponent {
    @Input() public lines: string[] = [];
}
