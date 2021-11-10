import {Injectable} from '@angular/core';
import {Cell, CircularQueue, LinearQueue, PriorityQueue} from '../../models/queue';

@Injectable({
    providedIn: 'root',
})
export class Chapter04Service {
    private readonly LOST_CELLS: Cell[] = [
        new Cell(4),
        new Cell(8),
        new Cell(15),
        new Cell(16),
        new Cell(23),
        new Cell(42),
    ];

    public generateLinearQueue(): LinearQueue {
        return new LinearQueue(10, JSON.parse(JSON.stringify(this.LOST_CELLS)));
    }

    public generateCircularQueue(): CircularQueue {
        return new CircularQueue(10, JSON.parse(JSON.stringify(this.LOST_CELLS)));
    }

    public generatePriorityQueue(): PriorityQueue {
        return new PriorityQueue(10, JSON.parse(JSON.stringify(this.LOST_CELLS)));
    }
}
