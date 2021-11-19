import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {AnimationAction, AnimationStep} from '../../models/animator';

@Component({
    selector: 'app-animator',
    templateUrl: './animator.component.html',
    styleUrls: ['./animator.component.scss'],
})
export class AnimatorComponent {
    @Output() private performActions: EventEmitter<AnimationAction[]> = new EventEmitter<AnimationAction[]>();
    @Output() private performReverseActions: EventEmitter<AnimationAction[]> = new EventEmitter<AnimationAction[]>();

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
        return this.isStepForwardButtonDisabled || this.isPlaying;
    }

    public get isPauseButtonDisabled(): boolean {
        return this.isStepForwardButtonDisabled || !this.isPlaying;
    }

    public get isStepForwardButtonDisabled(): boolean {
        return !this.isInitialized || this.currentStep + 1 >= this.steps.length;
    }

    public init(steps: AnimationStep[]): void {
        this.steps = steps;
        this.currentStep = -1;
        this.isPlaying = false;

        this.isInitialized = !!this.steps?.length;

        this.changeDetectorRef.detectChanges();
    }

    public async resetButtonClickHandler(): Promise<void> {
        this.isPlaying = false;

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

        if (this.currentStep + 1 >= this.steps.length) {
            this.isPlaying = false;
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
        this.performReverseActions.emit(actions);
        this.currentStep--;
    }

    private stepForward(): void {
        if (this.isStepForwardButtonDisabled) return;

        this.currentStep++;
        const {actions} = this.steps[this.currentStep];
        this.performActions.emit(actions);
    }

    private async waitForIt(duration: number = 200): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    }
}
