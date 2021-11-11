import {ChangeDetectorRef, Component} from '@angular/core';
import {AnimationActionType, AnimationStep} from '../../models/ogma';
import {GraphVisualizerComponent} from '../graph-visualizer/graph-visualizer.component';

@Component({
    selector: 'app-graph-animator',
    templateUrl: './graph-animator.component.html',
    styleUrls: ['./graph-animator.component.scss'],
})
export class GraphAnimatorComponent {
    private graphVisualizerComponent!: GraphVisualizerComponent;

    private steps!: AnimationStep[];
    private currentStep!: number;
    private isPlaying!: boolean;

    private isInitialized: boolean = false;

    public constructor(private changeDetectorRef: ChangeDetectorRef) {}

    public get isResetButtonDisabled(): boolean {
        return !this.isInitialized || this.currentStep === -1;
    }

    public get isStepBackButtonDisabled(): boolean {
        return !this.isInitialized || this.currentStep <= -1;
    }

    public get isPlayButtonDisabled(): boolean {
        return !this.isInitialized || this.isPlaying;
    }

    public get isPauseButtonDisabled(): boolean {
        return !this.isInitialized || !this.isPlaying;
    }

    public get isStepForwardButtonDisabled(): boolean {
        return !this.isInitialized || this.currentStep + 1 >= this.steps.length;
    }

    public init(graphVisualizerComponent: GraphVisualizerComponent, steps: AnimationStep[]): void {
        this.graphVisualizerComponent = graphVisualizerComponent;
        this.steps = steps;
        this.currentStep = -1;
        this.isPlaying = false;

        this.isInitialized = !!this.graphVisualizerComponent && !!this.steps?.length;

        this.changeDetectorRef.detectChanges();
    }

    public async resetButtonClickHandler(): Promise<void> {
        while (this.currentStep > -1) {
            this.stepBack();
        }
    }

    public async stepBackButtonClickHandler(): Promise<void> {
        this.stepBack();
    }

    public async playButtonClickHandler(): Promise<void> {
        this.isPlaying = true;

        while (this.isPlaying && this.currentStep + 1 < this.steps.length) {
            this.stepForward();
            await this.waitForIt();
        }
    }

    public async pauseButtonClickHandler(): Promise<void> {
        this.isPlaying = false;
    }

    public async stepForwardButtonClickHandler(): Promise<void> {
        this.stepForward();
    }

    private stepBack(): void {
        if (this.isStepBackButtonDisabled) return;

        const {actions} = this.steps[this.currentStep];

        actions.forEach((action) => {
            switch (action.actionType) {
                case AnimationActionType.ADD_CLASS:
                    action.element.removeClass(action.actionData.className);
                    break;
                case AnimationActionType.REMOVE_CLASS:
                    action.element.addClass(action.actionData.className);
                    break;
            }
        });

        this.currentStep--;
    }

    private stepForward(): void {
        if (this.isStepForwardButtonDisabled) return;

        this.currentStep++;
        const {actions} = this.steps[this.currentStep];

        actions.forEach((action) => {
            switch (action.actionType) {
                case AnimationActionType.ADD_CLASS:
                    action.element.addClass(action.actionData.className);
                    break;
                case AnimationActionType.REMOVE_CLASS:
                    action.element.removeClass(action.actionData.className);
                    break;
            }
        });
    }

    private async waitForIt(duration: number = 200): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    }
}
