export class Queue {
    public front: number = 0;
    public rear: number = -1;

    private filledCellsCount: number;

    public constructor(public size: number = 5, public cells: Cell[] = []) {
        this.filledCellsCount = this.cells.length;
    }

    public isFull(): boolean {
        return this.filledCellsCount === this.size;
    }

    public isEmpty(): boolean {
        return this.filledCellsCount === 0;
    }

    public dequeue(): Cell {
        if (this.isEmpty()) throw new Error('Queue is empty!');

        const result: Cell = this.cells[this.front];
        this.filledCellsCount--;

        if (this.isEmpty()) {
            this.front = 0;
            this.rear = -1;
        } else {
            this.front++;
        }

        return result;
    }

    public enqueue(cell: Cell): void {
        if (this.isFull()) throw new Error('Queue is full!');

        if (this.rear === this.size - 1) {
            const n: number = this.rear - this.front + 1;
            for (let i = 1; i <= n; i++) this.cells.shift();
        }

        if (this.isEmpty()) this.rear = 0;
        else this.rear++;

        this.cells[this.rear] = cell;
        this.filledCellsCount++;
    }
}

export class Cell {
    public constructor(public value: number) {}
}
