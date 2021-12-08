import {ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {AnimatorComponent} from '../animator/animator.component';
import {OgmaAnimationAction, OgmaAnimationActionType, OgmaAnimationStep} from '../../models/ogma';
import {AnimationAction} from '../../models/animator';
import {GraphVisualizerComponent} from '../graph-visualizer/graph-visualizer.component';

@Component({
    selector: 'app-graph-animator',
    templateUrl: './graph-animator.component.html',
    styleUrls: ['./graph-animator.component.scss'],
})
export class GraphAnimatorComponent {
    @Input() public graphVisualizerComponent!: GraphVisualizerComponent;

    @ViewChild('animator', {read: AnimatorComponent}) private animator!: AnimatorComponent;

    public constructor(private changeDetectorRef: ChangeDetectorRef) {}

    public init(steps: OgmaAnimationStep[]): void {
        this.animator.init(steps);
        this.changeDetectorRef.detectChanges();
    }

    public performReverseActions(actions: AnimationAction[]): void {
        (actions as OgmaAnimationAction[]).forEach((action) => {
            switch (action.actionType) {
                case OgmaAnimationActionType.ADD_ELEMENT:
                    this.graphVisualizerComponent.removeElement(action.element, false);
                    break;
                case OgmaAnimationActionType.REMOVE_ELEMENT:
                    if (action.element.isNode) this.graphVisualizerComponent.addNode(action.actionData, false);
                    else this.graphVisualizerComponent.addEdge(action.actionData.edge, false);
                    break;
                case OgmaAnimationActionType.ADD_CLASS:
                    action.element.removeClass(action.actionData.className).then();
                    break;
                case OgmaAnimationActionType.REMOVE_CLASS:
                    action.element.addClass(action.actionData.className).then();
                    break;
            }
        });
    }

    public performActions(actions: AnimationAction[]): void {
        (actions as OgmaAnimationAction[]).forEach((action) => {
            switch (action.actionType) {
                case OgmaAnimationActionType.ADD_ELEMENT:
                    if (action.element.isNode) this.graphVisualizerComponent.addNode(action.actionData, false);
                    else this.graphVisualizerComponent.addEdge(action.actionData.edge, false);
                    break;
                case OgmaAnimationActionType.REMOVE_ELEMENT:
                    this.graphVisualizerComponent.removeElement(action.element, false);
                    break;
                case OgmaAnimationActionType.ADD_CLASS:
                    action.element.addClass(action.actionData.className).then();
                    break;
                case OgmaAnimationActionType.REMOVE_CLASS:
                    action.element.removeClass(action.actionData.className).then();
                    break;
            }
        });
    }
}
