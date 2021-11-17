import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Stack, StackAnimationAction, StackAnimationActionType, StackAnimationStep} from '../../../models/stack';
import {AnimatorComponent} from '../../../components/animator/animator.component';
import {AnimationAction} from '../../../models/animator';

@Component({
    selector: 'app-infix-to-suffix',
    templateUrl: './infix-to-suffix.component.html',
    styleUrls: ['./infix-to-suffix.component.scss'],
})
export class InfixToSuffixComponent implements AfterViewInit {
    @ViewChild('animator', {read: AnimatorComponent}) private animator!: AnimatorComponent;

    public stack = new Stack(10);
    public infix: string[] = 'a.b+c'.split('');
    public suffix: string[] = [];
    public currentIndex: number = -1;

    private animationSteps: StackAnimationStep[] = [];

    public constructor(private changeDetectorRef: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        this.init();
        this.animator.init(this.animationSteps);
    }

    public performReverseActions(actions: AnimationAction[]): void {
        (actions as StackAnimationAction[]).forEach((action) => {
            switch (action.actionType) {
                case StackAnimationActionType.PUSH_TO_STACK:
                    this.stack.pop();
                    break;
                case StackAnimationActionType.POP_FROM_STACK:
                    this.stack.push(action.actionData.value);
                    break;
                case StackAnimationActionType.PUSH_TO_SUFFIX:
                    this.suffix.pop();
                    break;
                case StackAnimationActionType.MOVE_TO_INDEX:
                    this.currentIndex = action.actionData.previousValue;
                    break;
            }
        });

        this.changeDetectorRef.detectChanges();
    }

    public performActions(actions: AnimationAction[]): void {
        console.log(actions[0].actionType, actions[0]?.actionData?.value);

        (actions as StackAnimationAction[]).forEach((action) => {
            switch (action.actionType) {
                case StackAnimationActionType.PUSH_TO_STACK:
                    this.stack.push(action.actionData.value);
                    break;
                case StackAnimationActionType.POP_FROM_STACK:
                    this.stack.pop();
                    break;
                case StackAnimationActionType.PUSH_TO_SUFFIX:
                    this.suffix.push(action.actionData.value);
                    break;
                case StackAnimationActionType.MOVE_TO_INDEX:
                    this.currentIndex = action.actionData.value;
                    break;
            }
        });

        this.changeDetectorRef.detectChanges();
    }

    private init(): void {
        this.generateAnimationSteps();
    }

    private generateAnimationSteps(): void {
        this.animationSteps = [];

        this.infixToSuffix(this.stack.clone(), [...this.infix], [...this.suffix]);

        console.log('this.stack', this.stack);
        console.log('this.infix', this.infix);
        console.log('this.suffix', this.suffix);
        console.log('this.animationSteps', this.animationSteps);
    }

    private infixToSuffix(stack: Stack, infix: string[], suffix: string[]): void {
        let topOperator: string;

        for (let i = 0; i < infix.length; i++) {
            const character: string = infix[i];
            this.generateMoveToIndexStep(i, i - 1);

            if (!InfixToSuffixComponent.isOperator(character)) {
                suffix.push(character);
                this.generateStackStep(StackAnimationActionType.PUSH_TO_SUFFIX, character);
                continue;
            }

            if (character === ')') {
                topOperator = stack.pop();
                this.generateStackStep(StackAnimationActionType.POP_FROM_STACK, topOperator);

                while (topOperator !== '(') {
                    suffix.push(topOperator);
                    this.generateStackStep(StackAnimationActionType.PUSH_TO_SUFFIX, topOperator);

                    topOperator = stack.pop();
                    this.generateStackStep(StackAnimationActionType.POP_FROM_STACK, topOperator);
                }

                continue;
            }

            if (stack.isEmpty() || stack.peek() === '(' || InfixToSuffixComponent.isPrior(character, stack.peek())) {
                stack.push(character);
                this.generateStackStep(StackAnimationActionType.PUSH_TO_STACK, character);
                continue;
            }

            topOperator = stack.pop();
            this.generateStackStep(StackAnimationActionType.POP_FROM_STACK, topOperator);

            suffix.push(topOperator);
            this.generateStackStep(StackAnimationActionType.PUSH_TO_SUFFIX, topOperator);

            i--;
        }

        while (!stack.isEmpty()) {
            topOperator = stack.pop();
            suffix.push(topOperator);
            this.generateStackStep(StackAnimationActionType.PUSH_TO_SUFFIX, topOperator);
        }
    }

    private static isOperator(character: string): boolean {
        return ['+', '-', '.', '/', '(', ')'].includes(character);
    }

    private static isPrior(first: string, second: string): boolean {
        if (first === '+' && second === '+') return false;
        if (first === '-' && second === '-') return false;
        if (first === '.' && second === '.') return false;
        if (first === '/' && second === '/') return false;

        return (first === '.' || first === '/') && (second === '+' || second === '-');
    }

    private generateMoveToIndexStep(value: number, previousValue: number): void {
        this.animationSteps.push({
            actions: [{actionType: StackAnimationActionType.MOVE_TO_INDEX, actionData: {value, previousValue}}],
        });
    }

    private generateStackStep(actionType: StackAnimationActionType, value: any): void {
        this.animationSteps.push({
            actions: [{actionType, actionData: {value}}],
        });
    }
}
