import {Component, Input} from '@angular/core';
import {Chapter02Problem} from '../../../models/chapter02-problem';

@Component({
    selector: 'app-problem',
    templateUrl: './problem.component.html',
    styleUrls: ['./problem.component.scss'],
})
export class ProblemComponent {
    @Input() public problem!: Chapter02Problem;
    @Input() public problemIndex!: number;
    @Input() public isLast!: boolean;

    public checked: boolean = false;
}
