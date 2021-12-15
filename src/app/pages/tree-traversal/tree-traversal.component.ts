import {Component} from '@angular/core';
import {SimpleTreeGenerator} from '../../models/graph-generator';
import {OgmaService} from '../../services/ogma.service';
import {Layout, Node, OgmaAnimationStep} from '../../models/ogma';
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
            startNode: Node;
            targetNode: Node;
        },
        method: string
    ): void {
        // @ts-ignore
        this[method](payload.animationSteps, payload.graphVisualizerComponent, 1);
    }

    private infix(
        animationSteps: OgmaAnimationStep[],
        graphVisualizerComponent: GraphVisualizerComponent,
        index: number | undefined
    ): void {
        if (index === undefined) return;

        this.infix(animationSteps, graphVisualizerComponent, this.tree[index].left);
        this.ogmaService.generateAddClassNameStep(animationSteps, graphVisualizerComponent.getNode(index));
        this.infix(animationSteps, graphVisualizerComponent, this.tree[index].right);
    }

    private prefix(
        animationSteps: OgmaAnimationStep[],
        graphVisualizerComponent: GraphVisualizerComponent,
        index: number | undefined
    ): void {
        if (index === undefined) return;

        this.ogmaService.generateAddClassNameStep(animationSteps, graphVisualizerComponent.getNode(index));
        this.prefix(animationSteps, graphVisualizerComponent, this.tree[index].left);
        this.prefix(animationSteps, graphVisualizerComponent, this.tree[index].right);
    }

    private suffix(
        animationSteps: OgmaAnimationStep[],
        graphVisualizerComponent: GraphVisualizerComponent,
        index: number | undefined
    ): void {
        if (index === undefined) return;

        this.suffix(animationSteps, graphVisualizerComponent, this.tree[index].left);
        this.suffix(animationSteps, graphVisualizerComponent, this.tree[index].right);
        this.ogmaService.generateAddClassNameStep(animationSteps, graphVisualizerComponent.getNode(index));
    }
}
