import {Component} from '@angular/core';
import {Stack} from '../../models/stack';
import {Chapter05Service} from './chapter05.service';

@Component({
    selector: 'app-chapter05',
    templateUrl: './chapter05.component.html',
    styleUrls: ['./chapter05.component.scss'],
})
export class Chapter05Component {
    public emptyStack!: Stack;
    public lostStack!: Stack;

    public constructor(private chapter05Service: Chapter05Service) {
        this.resetEmptyStack();
        this.resetLostStack();
    }

    public emptyStackResetEventEmitterHandler(): void {
        this.resetEmptyStack();
    }

    public lostStackResetEventEmitterHandler(): void {
        this.resetLostStack();
    }

    private resetEmptyStack(): void {
        this.emptyStack = this.chapter05Service.generateEmptyStack();
    }

    private resetLostStack(): void {
        this.lostStack = this.chapter05Service.generateLostStack();
    }
}
