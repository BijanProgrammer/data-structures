import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import {createPopper, Instance, Placement, VirtualElement} from '@popperjs/core';

@Component({
    selector: 'app-expression',
    templateUrl: './expression.component.html',
    styleUrls: ['./expression.component.scss'],
})
export class ExpressionComponent implements AfterViewInit, OnChanges {
    @Input() public expression: string[] = [];
    @Input() public target!: number;

    @ViewChild('expressionRef') public expressionRef!: ElementRef;
    @ViewChild('targetPopperContentRef') public targetPopperContentRef!: ElementRef;

    private targetPopper!: Instance;

    public get expandedExpression(): string[] {
        return [...this.expression, ...Array(14 - this.expression.length).fill(' ')];
    }

    private get targetHtmlElement(): HTMLElement {
        return this.expressionRef?.nativeElement?.querySelector('.target') || null;
    }

    public ngAfterViewInit(): void {
        this.updatePoppers();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.target === undefined) if (!this.targetPopper || !changes?.target || changes.target.firstChange) return;

        const {previousValue, currentValue} = changes.target;
        if (previousValue !== currentValue) {
            setTimeout(() => this.updatePoppers());
        }
    }

    private updatePoppers(): void {
        if (this.target === undefined) return;

        if (this.targetHtmlElement) {
            if (this.targetPopper) this.targetPopper.destroy();
            this.targetPopper = ExpressionComponent.createPopper(
                this.targetHtmlElement,
                this.targetPopperContentRef,
                'bottom'
            );
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
