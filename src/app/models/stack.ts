export class Stack {
    public top: number;

    public constructor(public size: number = 5, public cells: Cell[] = []) {
        this.top = this.cells.length - 1;
        this.addEmptyCellsToStackIfNeeded();
    }

    public isFull(): boolean {
        return this.top === this.size - 1;
    }

    public isEmpty(): boolean {
        return this.top === -1;
    }

    public peek(): Cell {
        if (this.isEmpty()) throw new Error('Stack is empty!');

        return this.cells[this.top];
    }

    public push(cell: Cell): void {
        if (this.isFull()) throw new Error('Stack is full!');

        this.top++;
        this.cells[this.top] = cell;
    }

    public pop(): Cell {
        const cell: Cell = this.peek();
        this.top--;

        return cell;
    }

    public clone(): Stack {
        return {...this};
    }

    protected addEmptyCellsToStackIfNeeded(): void {
        this.cells.push(...Array(this.size - this.cells.length).fill(new Cell()));
    }
}

export class Cell {
    public constructor(public value: string | number = '') {}
}
