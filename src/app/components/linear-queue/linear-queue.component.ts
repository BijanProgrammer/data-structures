import {Component, Input} from '@angular/core';
import {Queue} from '../../models/queue';

@Component({
    selector: 'app-linear-queue',
    templateUrl: './linear-queue.component.html',
    styleUrls: ['./linear-queue.component.scss'],
})
export class LinearQueueComponent {
    @Input() public queue: Queue = new Queue();
}
