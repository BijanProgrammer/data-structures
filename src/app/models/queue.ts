export class Queue {
    public front: number = 0;
    public rear: number;

    private filledCellsCount: number;

    public constructor(public size: number = 5, public cells: Cell[] = []) {
        this.rear = this.cells.length - 1;
        this.filledCellsCount = this.cells.length;

        this.cells.push(...Array(this.size - this.cells.length).fill(new Cell()));
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

    private shiftToBeginning(): void {
        const amount = this.front;
        for (let i = this.front; i <= this.rear; i++) {
            this.cells[i - amount] = {...this.cells[i]};
            this.cells[i] = new Cell();
        }

        this.front -= amount;
        this.rear -= amount;
    }
}

export class Cell {
    public constructor(public value: string | number = '') {}
}
