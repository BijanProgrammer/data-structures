import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Cell, Queue} from '../../../models/queue';

@Component({
    selector: 'app-queue-playground',
    templateUrl: './queue-playground.component.html',
    styleUrls: ['./queue-playground.component.scss'],
})
export class QueuePlaygroundComponent {
    @Input() public queue!: Queue;

    @Output() public resetEventEmitter: EventEmitter<void> = new EventEmitter<void>();

    public dequeuedCell: Cell | null = null;
    public error: string = '';

    public enqueueButtonClickHandler(): void {
        try {
            const randomNumber: number = Math.floor(Math.random() * 10);
            this.queue.enqueue(new Cell(randomNumber));
            this.error = '';
        } catch (e: any) {
            this.error = e;
        }
    }

    public dequeueButtonClickHandler(): void {
        try {
            this.dequeuedCell = this.queue.dequeue();
            this.error = '';
        } catch (e: any) {
            this.error = e;
        }
    }

    public resetButtonClickHandler(): void {
        this.resetEventEmitter.emit();
        this.error = '';
    }
}
