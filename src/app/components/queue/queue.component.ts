import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import {createPopper, Instance, Placement, VirtualElement} from '@popperjs/core';

import {Queue} from '../../models/queue';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements AfterViewInit, OnChanges {
    @Input() public queue!: Queue;

    @ViewChild('queueRef') public queueRef!: ElementRef;
    @ViewChild('frontPopperContentRef') public frontPopperContentRef!: ElementRef;
    @ViewChild('rearPopperContentRef') public rearPopperContentRef!: ElementRef;

    private frontPopper!: Instance;
    private rearPopper!: Instance;

    private get frontHtmlElement(): HTMLElement {
        return this.queueRef?.nativeElement?.querySelector('.front') || null;
    }

    private get rearHtmlElement(): HTMLElement {
        return this.queueRef?.nativeElement?.querySelector('.rear') || null;
    }

    public ngAfterViewInit(): void {
        this.updatePoppers();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!this.frontPopper || !this.rearPopper || !changes?.queue || changes.queue.firstChange) return;

        const {previousValue, currentValue} = changes.queue;

        if (previousValue?.front !== currentValue?.front || previousValue?.rear !== currentValue?.rear) {
            setTimeout(() => this.updatePoppers());
        }
    }

    private updatePoppers(): void {
        if (this.frontHtmlElement) {
            if (this.frontPopper) this.frontPopper.destroy();
            this.frontPopper = QueueComponent.createPopper(this.frontHtmlElement, this.frontPopperContentRef, 'top');
        }

        if (this.rearHtmlElement) {
            if (this.rearPopper) this.rearPopper.destroy();
            this.rearPopper = QueueComponent.createPopper(this.rearHtmlElement, this.rearPopperContentRef, 'bottom');
        }
    }

    private static createPopper(
        reference: Element | VirtualElement,
        popper: ElementRef,
        placement: Placement
    ): Instance {
        return createPopper(reference, popper.nativeElement, {
            placement,
            modifiers: [{name: 'offset', options: {offset: [0, 10]}}],
        });
    }
}
