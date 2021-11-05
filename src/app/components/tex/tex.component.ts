import {Component, Input} from '@angular/core';
import {KatexOptions} from 'ng-katex';

@Component({
    selector: 'app-tex',
    templateUrl: './tex.component.html',
    styleUrls: ['./tex.component.scss'],
})
export class TexComponent {
    @Input() public equation: string = '';

    public options: KatexOptions = {};
}
