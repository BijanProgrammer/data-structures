import {Component} from '@angular/core';
import {SimpleTreeGenerator} from '../../models/graph-generator';
import {OgmaService} from '../../services/ogma.service';
import {ClassName, Edge, Layout, Node, OgmaAnimationActionType, OgmaAnimationStep} from '../../models/ogma';
import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

@Component({
    selector: 'app-tree-traversal',
    templateUrl: './tree-traversal.component.html',
    styleUrls: ['./tree-traversal.component.scss'],
})
export class TreeTraversalComponent {
    public Layout = Layout;

    public randomTreeGenerator = new SimpleTreeGenerator();
    public methods: string[] = ['inorder', 'preorder', 'postorder'];

    private animationSteps!: OgmaAnimationStep[];
    private graphVisualizerComponent!: GraphVisualizerComponent;

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(
        payload: {
            animationSteps: OgmaAnimationStep[];
            graphVisualizerComponent: GraphVisualizerComponent;
        },
        method: string
    ): void {
        this.animationSteps = payload.animationSteps;
        this.graphVisualizerComponent = payload.graphVisualizerComponent;

        // @ts-ignore
        this[method](1);
    }

    private inorder(index: number | undefined): void {
        if (index === undefined) return;

        this.markAsVisited(index);
        const {left, right} = this.leftAndRight(index);

        this.inorder(left);
        this.print(index);
        this.inorder(right);
    }

    private preorder(index: number | undefined): void {
        if (index === undefined) return;

        this.markAsVisited(index);
        const {left, right} = this.leftAndRight(index);

        this.print(index);
        this.preorder(left);
        this.preorder(right);
    }

    private postorder(index: number | undefined): void {
        if (index === undefined) return;

        this.markAsVisited(index);
        const {left, right} = this.leftAndRight(index);

        this.postorder(left);
        this.postorder(right);
        this.print(index);
    }

    private leftAndRight(index: number): {left: number | undefined; right: number | undefined} {
        let left;
        let right;

        const node = this.graphVisualizerComponent.getNode(index);
        const [first, second]: Edge[] = node.getAdjacentEdges({direction: 'out'}).toArray();

        const firstIndex = first?.getTarget().getData('index');
        const secondIndex = second?.getTarget().getData('index');

        if (firstIndex === 0) left = first.getTarget().getId();
        if (secondIndex === 0) left = second.getTarget().getId();

        if (firstIndex === 1) right = first.getTarget().getId();
        if (secondIndex === 1) right = second.getTarget().getId();

        return {left, right};
    }

    private markAsVisited(index: number): void {
        const element: Node = this.graphVisualizerComponent.getNode(index);

        this.animationSteps.push({
            actions: [
                {element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className: ClassName.SECONDARY}},
            ],
        });
    }

    private print(index: number): void {
        const element: Node = this.graphVisualizerComponent.getNode(index);

        this.animationSteps.push({
            actions: [
                {
                    element,
                    actionType: OgmaAnimationActionType.REMOVE_CLASS,
                    actionData: {className: ClassName.SECONDARY},
                },
                {element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className: ClassName.PATH}},
            ],
        });
    }
}
