import {Component} from '@angular/core';
import {LinearOneWayLinkedListGraphGenerator} from '../../models/graph-generator';
import {ClassName, Edge, Node, OgmaAnimationStep} from '../../models/ogma';
import {OgmaService} from '../../services/ogma.service';
import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

@Component({
    selector: 'app-chapter07',
    templateUrl: './chapter07.component.html',
    styleUrls: ['./chapter07.component.scss'],
})
export class Chapter07Component {
    public examples = [
        {
            graphGenerator: new LinearOneWayLinkedListGraphGenerator(),
            solve: this.solveExample1.bind(this),
        },
        {
            graphGenerator: new LinearOneWayLinkedListGraphGenerator(),
            solve: this.solveExample2.bind(this),
        },
        {
            graphGenerator: new LinearOneWayLinkedListGraphGenerator(7),
            solve: this.solveExample3.bind(this),
        },
    ];

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(
        payload: {
            animationSteps: OgmaAnimationStep[];
            graphVisualizerComponent: GraphVisualizerComponent;
            head: Node;
        },
        index: number
    ): void {
        this.examples[index].solve(payload.animationSteps, payload.graphVisualizerComponent, payload.head);
    }

    private solveExample1(
        animationSteps: OgmaAnimationStep[],
        graphVisualizerComponent: GraphVisualizerComponent,
        head: Node
    ): void {
        this.removeHeadClass(animationSteps, head);
        this.addHeadClass(animationSteps, head.getAdjacentEdges().toArray()[0].getTarget());
        this.removeNode(animationSteps, head);
    }

    private solveExample2(
        animationSteps: OgmaAnimationStep[],
        graphVisualizerComponent: GraphVisualizerComponent,
        head: Node
    ): void {
        const secondNodeId = this.next(head).getId();

        this.rewire(animationSteps, this.getEdge(head), this.next(this.next(head)));
        this.removeNode(animationSteps, graphVisualizerComponent.getNode(secondNodeId));
    }

    private solveExample3(
        animationSteps: OgmaAnimationStep[],
        graphVisualizerComponent: GraphVisualizerComponent,
        head: Node
    ): void {}

    private removeHeadClass(animationSteps: OgmaAnimationStep[], node: Node): void {
        this.ogmaService.generateRemoveClassNameStep(animationSteps, node, ClassName.PATH);
    }

    private addHeadClass(animationSteps: OgmaAnimationStep[], node: Node): void {
        this.ogmaService.generateAddClassNameStep(animationSteps, node, ClassName.PATH);
    }

    private removeNode(animationSteps: OgmaAnimationStep[], node: Node): void {
        const rawData = this.ogmaService.generateLinkedListNodeRawData(node);
        this.ogmaService.generateRemoveElementStep(animationSteps, node, rawData);
    }

    private rewire(animationSteps: OgmaAnimationStep[], edge: Edge, newTarget: Node): void {
        this.ogmaService.generateRewireStep(animationSteps, edge, newTarget);
    }

    private getEdge(node: Node): Edge {
        return node.getAdjacentEdges().toArray()[0];
    }

    private next(node: Node): Node {
        return this.getEdge(node).getTarget();
    }
}
