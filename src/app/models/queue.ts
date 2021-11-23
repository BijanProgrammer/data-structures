export abstract class Queue {
    public front: number = 0;
    public rear!: number;

    protected constructor(public size: number = 5, public cells: Cell[] = []) {}

    public abstract isFull(): boolean;

    public abstract isEmpty(): boolean;

    public abstract dequeue(): Cell;

    public abstract enqueue(cell: Cell): void;

    public clone(): Queue {
        return {...this};
    }

    protected addEmptyCellsToQueueIfNeeded(): void {
        this.cells.push(...Array(this.size - this.cells.length).fill(new Cell()));
    }
}

export class LinearQueue extends Queue {
    protected filledCellsCount: number;

    public constructor(public size: number = 5, public cells: Cell[] = []) {
        super(size, cells);

        this.rear = this.cells.length - 1;
        this.filledCellsCount = this.cells.length;

        this.addEmptyCellsToQueueIfNeeded();
    }

    public isFull(): boolean {
        return this.filledCellsCount === this.size;
    }

    public isEmpty(): boolean {
        return this.filledCellsCount === 0;
    }

    public dequeue(): Cell {
        if (this.isEmpty()) throw new Error('Queue is empty!');

        const result: Cell = {...this.cells[this.front]};
        this.cells[this.front] = new Cell();
        this.filledCellsCount--;

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = -1;
        } else {
            this.front++;
        }

        return {...result};
    }

    public enqueue(cell: Cell): void {
        if (this.isFull()) throw new Error('Queue is full!');

        if (this.rear === this.size - 1) {
            this.shiftToBeginning();
        }

        if (this.isEmpty()) this.rear = 0;
        else this.rear++;

        this.cells[this.rear] = {...cell};
        this.filledCellsCount++;
    }

    public clone(): Queue {
        return {...this};
    }

    protected shiftToBeginning(): void {
        const amount = this.front;
        for (let i = this.front; i <= this.rear; i++) {
            this.cells[i - amount] = {...this.cells[i]};
            this.cells[i] = new Cell();
        }

        this.front -= amount;
        this.rear -= amount;
    }
}

export class CircularQueue extends Queue {
    public constructor(public size: number = 5, public cells: Cell[] = []) {
        super(size, cells);

        this.rear = this.cells.length - 1;

        this.addEmptyCellsToQueueIfNeeded();
    }

    public isFull(): boolean {
        return (this.rear + 2) % this.size === this.front;
    }

    public isEmpty(): boolean {
        return (this.rear + 1) % this.size === this.front;
    }

    public dequeue(): Cell {
        if (this.isEmpty()) throw new Error('Queue is empty!');

        const result: Cell = {...this.cells[this.front]};
        this.cells[this.front] = new Cell();
        this.front = (this.front + 1) % this.size;

        return {...result};
    }

    public enqueue(cell: Cell): void {
        if (this.isFull()) throw new Error('Queue is full!');

        this.rear = (this.rear + 1) % this.size;
        this.cells[this.rear] = {...cell};
    }

    public clone(): Queue {
        return {...this};
    }
}

export class PriorityQueue extends Queue {
    protected filledCellsCount: number;

    public constructor(public size: number = 5, public cells: Cell[] = []) {
        super(size, cells);

        this.rear = this.cells.length - 1;
        this.filledCellsCount = this.cells.length;

        this.addEmptyCellsToQueueIfNeeded();
    }

    public isFull(): boolean {
        return this.filledCellsCount === this.size;
    }

    public isEmpty(): boolean {
        return this.filledCellsCount === 0;
    }

    public dequeue(): Cell {
        if (this.isEmpty()) throw new Error('Queue is empty!');

        const result: Cell = {...this.cells[this.front]};
        this.cells[this.front] = new Cell();
        this.filledCellsCount--;

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = -1;
        } else {
            this.front++;
        }

        return {...result};
    }

    public enqueue(cell: Cell): void {
        if (this.isFull()) throw new Error('Queue is full!');

        if (this.rear === this.size - 1) {
            this.shiftToBeginning();
        }

        if (this.isEmpty()) this.rear = 0;
        else this.rear++;

        this.cells[this.rear] = {...cell};
        this.filledCellsCount++;

        this.sort();
    }

    public clone(): Queue {
        return {...this};
    }

    protected shiftToBeginning(): void {
        const amount = this.front;
        for (let i = this.front; i <= this.rear; i++) {
            this.cells[i - amount] = {...this.cells[i]};
            this.cells[i] = new Cell();
        }

        this.front -= amount;
        this.rear -= amount;
    }

    private sort(): void {
        for (let i = this.rear; i > 0; i--) {
            if (this.cells[i].value < this.cells[i - 1].value) {
                [this.cells[i], this.cells[i - 1]] = [this.cells[i - 1], this.cells[i]];
            } else {
                break;
            }
        }
    }
}

export class Cell {
    public constructor(public value: any = '') {}
}
