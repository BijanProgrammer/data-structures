import {Component} from '@angular/core';
import {Cell, Queue} from '../../models/queue';

@Component({
    selector: 'app-chapter04',
    templateUrl: './chapter04.component.html',
    styleUrls: ['./chapter04.component.scss'],
})
export class Chapter04Component {
    public linearQueue: Queue = new Queue(10, [
        new Cell(4),
        new Cell(8),
        new Cell(15),
        new Cell(16),
        new Cell(23),
        new Cell(42),
    ]);

    public linearQueueResetEventEmitterHandler(): void {
        this.linearQueue = new Queue(10, [
            new Cell(4),
            new Cell(8),
            new Cell(15),
            new Cell(16),
            new Cell(23),
            new Cell(42),
        ]);
    }
}
