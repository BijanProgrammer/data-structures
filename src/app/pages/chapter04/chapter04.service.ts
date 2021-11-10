import {Injectable} from '@angular/core';
import {Cell, CircularQueue, LinearQueue} from '../../models/queue';

@Injectable({
    providedIn: 'root',
})
export class Chapter04Service {
    public generateLinearQueue(): LinearQueue {
        return new LinearQueue(10, [new Cell(4), new Cell(8), new Cell(15), new Cell(16), new Cell(23), new Cell(42)]);
    }

    public generateCircularQueue(): CircularQueue {
        return new CircularQueue(10, [
            new Cell(4),
            new Cell(8),
            new Cell(15),
            new Cell(16),
            new Cell(23),
            new Cell(42),
        ]);
    }
}
