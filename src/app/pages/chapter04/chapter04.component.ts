import {Component} from '@angular/core';
import {CircularQueue, LinearQueue} from '../../models/queue';
import {Chapter04Service} from './chapter04.service';

@Component({
    selector: 'app-chapter04',
    templateUrl: './chapter04.component.html',
    styleUrls: ['./chapter04.component.scss'],
})
export class Chapter04Component {
    public linearQueue: LinearQueue;
    public circularQueue: CircularQueue;
    public priorityQueue: CircularQueue;

    public constructor(private chapter04Service: Chapter04Service) {
        this.linearQueue = this.chapter04Service.generateLinearQueue();
        this.circularQueue = this.chapter04Service.generateCircularQueue();
        this.priorityQueue = this.chapter04Service.generatePriorityQueue();
    }

    public linearQueueResetEventEmitterHandler(): void {
        this.linearQueue = this.chapter04Service.generateLinearQueue();
    }

    public circularQueueResetEventEmitterHandler(): void {
        this.circularQueue = this.chapter04Service.generateCircularQueue();
    }

    public priorityQueueResetEventEmitterHandler(): void {
        this.priorityQueue = this.chapter04Service.generatePriorityQueue();
    }
}
