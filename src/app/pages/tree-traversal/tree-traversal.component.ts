import {Component} from '@angular/core';
import {SimpleTreeGenerator} from '../../models/graph-generator';
import {OgmaService} from '../../services/ogma.service';
import {ClassName, Layout, Node, OgmaAnimationActionType, OgmaAnimationStep} from '../../models/ogma';
import {TreeNode} from '../../models/binary-tree';
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

    private tree: {[key: number]: TreeNode} = {
        1: {
            value: 'A',
            left: 3,
            right: 2,
        },
        2: {
            value: 'B',
            left: 4,
        },
        3: {
            value: 'C',
            left: 5,
        },
        4: {
            value: 'N',
        },
        5: {
            value: 'M',
            left: 7,
            right: 6,
        },
        6: {
            value: 'P',
        },
        7: {
            value: 'F',
        },
    };

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

        this.inorder(this.tree[index].left);
        this.print(index);
        this.inorder(this.tree[index].right);
    }

    private preorder(index: number | undefined): void {
        if (index === undefined) return;

        this.markAsVisited(index);

        this.print(index);
        this.preorder(this.tree[index].left);
        this.preorder(this.tree[index].right);
    }

    private postorder(index: number | undefined): void {
        if (index === undefined) return;

        this.markAsVisited(index);

        this.postorder(this.tree[index].left);
        this.postorder(this.tree[index].right);
        this.print(index);
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
