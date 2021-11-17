import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import {createPopper, Instance, Placement, VirtualElement} from '@popperjs/core';

import {Stack} from '../../models/stack';

@Component({
    selector: 'app-stack',
    templateUrl: './stack.component.html',
    styleUrls: ['./stack.component.scss'],
})
export class StackComponent implements AfterViewInit, OnChanges {
    @Input() public stack!: Stack;

    @ViewChild('stackRef') public stackRef!: ElementRef;
    @ViewChild('topPopperContentRef') public topPopperContentRef!: ElementRef;

    private topPopper!: Instance;

    private get topHtmlElement(): HTMLElement {
        return this.stackRef?.nativeElement?.querySelector('.top') || null;
    }

    public ngAfterViewInit(): void {
        this.updatePoppers();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!this.topPopper || !changes?.stack || changes.stack.firstChange) return;

        const {previousValue, currentValue} = changes.stack;

        if (previousValue?.top !== currentValue?.top) {
            setTimeout(() => this.updatePoppers());
        }
    }

    private updatePoppers(): void {
        if (this.topHtmlElement) {
            if (this.topPopper) this.topPopper.destroy();
            this.topPopper = StackComponent.createPopper(this.topHtmlElement, this.topPopperContentRef, 'right');
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
