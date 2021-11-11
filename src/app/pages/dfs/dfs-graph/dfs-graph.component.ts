import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';

import {GraphVisualizerComponent} from '../../../components/graph-visualizer/graph-visualizer.component';

import {AnimationActionType, AnimationStep, ClassName, Layout} from 'src/app/models/ogma';
import {GraphAnimatorComponent} from '../../../components/graph-animator/graph-animator.component';
import {GraphGenerator} from '../../../models/graph-generator';

@Component({
    selector: 'app-dfs-graph',
    templateUrl: './dfs-graph.component.html',
    styleUrls: ['./dfs-graph.component.scss'],
})
export class DfsGraphComponent implements AfterViewInit {
    public Layout = Layout;

    @Input() public graphId: string = 'graph-container';
    @Input() public title: string = 'Graph';
    @Input() public graphGenerator!: GraphGenerator;
    @Input() public isRegenerationEnabled: boolean = false;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    @ViewChild('graphAnimatorComponent', {read: GraphAnimatorComponent})
    public graphAnimatorComponent!: GraphAnimatorComponent;

    private animationSteps: AnimationStep[] = [];

    public ngAfterViewInit(): void {
        this.init();
    }

    public regenerateButtonClickHandler(): void {
        this.init();
    }

    private init(): void {
        this.populateGraph();
        this.generateAnimationSteps();

        this.graphAnimatorComponent.init(this.graphVisualizerComponent, this.animationSteps);
    }

    private populateGraph(): void {
        const {nodes, edges} = this.graphGenerator.generateGraph(this.graphVisualizerComponent);
        this.graphVisualizerComponent.setGraph(nodes, edges);
    }

    private generateAnimationSteps(): void {
        this.animationSteps = [];

        const startNode: any = this.graphVisualizerComponent.getNode(1);
        const targetNode: any = this.graphVisualizerComponent.getNode(5);

        this.dfs(startNode, targetNode);
    }

    private dfs(currentNode: any, targetNode: any): boolean {
        this.generateAddClassNameStep(currentNode);
        currentNode.setData('visited', true);

        if (currentNode === targetNode) return true;

        const edges: any[] = currentNode.getAdjacentEdges({direction: 'out'}).toArray();
        for (const edge of edges) {
            if (edge.getData('visited')) continue;

            const nextNode = edge.getTarget();
            if (nextNode.getData('visited')) {
                this.generateAddClassNameStep(edge, ClassName.DISABLED);
                continue;
            }

            this.generateAddClassNameStep(edge);
            edge.setData('visited', true);

            const found = this.dfs(nextNode, targetNode);
            if (found) return true;

            this.generateRemoveClassNameStep(edge);
        }

        this.generateRemoveClassNameStep(currentNode);

        return false;
    }

    private generateAddClassNameStep(element: any, className: ClassName = ClassName.PATH): void {
        this.animationSteps.push({
            actions: [{element, actionType: AnimationActionType.ADD_CLASS, actionData: {className}}],
        });
    }

    private generateRemoveClassNameStep(element: any): void {
        this.animationSteps.push({
            actions: [
                {element, actionType: AnimationActionType.REMOVE_CLASS, actionData: {className: ClassName.PATH}},
                {element, actionType: AnimationActionType.ADD_CLASS, actionData: {className: ClassName.DISABLED}},
            ],
        });
    }
}
