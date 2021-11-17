import {Injectable} from '@angular/core';
import {Cell, Stack} from '../../models/stack';

@Injectable({
    providedIn: 'root',
})
export class Chapter05Service {
    private readonly LOST_CELLS: Cell[] = [
        new Cell(4),
        new Cell(8),
        new Cell(15),
        new Cell(16),
        new Cell(23),
        new Cell(42),
    ];

    public generateEmptyStack(): Stack {
        return new Stack(10);
    }

    public generateLostStack(): Stack {
        return new Stack(10, JSON.parse(JSON.stringify(this.LOST_CELLS)));
    }
}
