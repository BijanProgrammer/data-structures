import {AnimationAction, AnimationStep} from './animator';

export class Stack {
    public top: number;

    public constructor(public size: number = 5, public cells: string[] = []) {
        this.top = this.cells.length - 1;
        this.addEmptyCellsToStackIfNeeded();
    }

    public isFull(): boolean {
        return this.top === this.size - 1;
    }

    public isEmpty(): boolean {
        return this.top === -1;
    }

    public peek(): string {
        if (this.isEmpty()) throw new Error('Stack is empty!');

        return this.cells[this.top];
    }

    public push(cell: string): void {
        if (this.isFull()) throw new Error('Stack is full!');

        this.top++;
        this.cells[this.top] = cell;
    }

    public pop(): string {
        const cell: string = this.peek();

        this.cells[this.top] = '';
        this.top--;

        return cell;
    }

    public clone(): Stack {
        const stack = new Stack(this.size, [...this.cells]);
        stack.top = this.top;
        return stack;
    }

    protected addEmptyCellsToStackIfNeeded(): void {
        this.cells.push(...Array(this.size - this.cells.length).fill(''));
    }
}

export interface StackAnimationStep extends AnimationStep {
    actions: StackAnimationAction[];
}

export interface StackAnimationAction extends AnimationAction {
    actionType: StackAnimationActionType;
    actionData: {value: any; previousValue?: any};
}

export enum StackAnimationActionType {
    PUSH_TO_STACK,
    POP_FROM_STACK,
    PUSH_TO_INFIX,
    POP_FROM_INFIX,
    PUSH_TO_SUFFIX,
    POP_FROM_SUFFIX,
    MOVE_TO_INDEX,
}
