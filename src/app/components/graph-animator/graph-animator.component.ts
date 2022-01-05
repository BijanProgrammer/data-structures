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
        let node;

        (actions as OgmaAnimationAction[]).forEach((action) => {
            if (action.callback) {
                action.callback(true);
                return;
            }

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
                case OgmaAnimationActionType.ADD_CLASS_BY_ID:
                    node = this.graphVisualizerComponent.getNode(action.actionData.id);
                    if (node) node.removeClass(action.actionData.className).then();
                    break;
                case OgmaAnimationActionType.REMOVE_CLASS_BY_ID:
                    this.graphVisualizerComponent
                        .getNode(action.actionData.id)
                        .addClass(action.actionData.className)
                        .then();
                    break;
                case OgmaAnimationActionType.REWIRE:
                    (action.element as any).setTarget(
                        this.graphVisualizerComponent.getNode(action.actionData.oldTarget)
                    );
                    break;
                case OgmaAnimationActionType.ADD_NODE:
                    node = this.graphVisualizerComponent.getNode(action.actionData.id);
                    if (node) this.graphVisualizerComponent.removeElement(node, false);
                    break;
                case OgmaAnimationActionType.ADD_EDGE:
                    const edge = this.graphVisualizerComponent.getEdge(action.actionData.id);
                    if (edge) this.graphVisualizerComponent.removeElement(edge, false);
                    break;
                case OgmaAnimationActionType.REMOVE_EDGE:
                    if (!action.actionData.id) action.actionData.id = this.graphVisualizerComponent.getEdges().size + 1;
                    this.graphVisualizerComponent.addEdge(action.actionData, false);
                    break;
                case OgmaAnimationActionType.SET_DATA:
                    action.element.setData(action.actionData.path, action.actionData.oldData);
                    break;
                case OgmaAnimationActionType.SET_ATTRIBUTE:
                    action.element.setAttribute(action.actionData.path, action.actionData.oldAttribute).then();
                    break;
            }
        });
    }

    public performActions(actions: AnimationAction[]): void {
        (actions as OgmaAnimationAction[]).forEach((action) => {
            if (action.callback) {
                action.callback(false);
                return;
            }

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
                case OgmaAnimationActionType.ADD_CLASS_BY_ID:
                    this.graphVisualizerComponent
                        .getNode(action.actionData.id)
                        .addClass(action.actionData.className)
                        .then();
                    break;
                case OgmaAnimationActionType.REMOVE_CLASS_BY_ID:
                    this.graphVisualizerComponent
                        .getNode(action.actionData.id)
                        .removeClass(action.actionData.className)
                        .then();
                    break;
                case OgmaAnimationActionType.REWIRE:
                    (action.element as any).setTarget(
                        this.graphVisualizerComponent.getNode(action.actionData.newTarget)
                    );
                    break;
                case OgmaAnimationActionType.ADD_NODE:
                    this.graphVisualizerComponent.addNode(action.actionData, false);
                    break;
                case OgmaAnimationActionType.ADD_EDGE:
                    if (!action.actionData.id) action.actionData.id = this.graphVisualizerComponent.getEdges().size + 1;
                    this.graphVisualizerComponent.addEdge(action.actionData, false);
                    break;
                case OgmaAnimationActionType.REMOVE_EDGE:
                    const edge = this.graphVisualizerComponent.getEdge(action.actionData.id);
                    if (edge) this.graphVisualizerComponent.removeElement(edge, false);
                    break;
                case OgmaAnimationActionType.SET_DATA:
                    action.element.setData(action.actionData.path, action.actionData.newData);
                    break;
                case OgmaAnimationActionType.SET_ATTRIBUTE:
                    action.element.setAttribute(action.actionData.path, action.actionData.newAttribute).then();
                    break;
            }
        });
    }
}
