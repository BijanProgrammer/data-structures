import {AfterViewInit, Component, ViewChild} from '@angular/core';

import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

import {AnimationActionType, AnimationStep, ClassName, Layout} from 'src/app/models/ogma';
import {GraphAnimatorComponent} from '../../components/graph-animator/graph-animator.component';

@Component({
    selector: 'app-dfs',
    templateUrl: './dfs.component.html',
    styleUrls: ['./dfs.component.scss'],
})
export class DfsComponent implements AfterViewInit {
    public Layout = Layout;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    @ViewChild('graphAnimatorComponent', {read: GraphAnimatorComponent})
    public graphAnimatorComponent!: GraphAnimatorComponent;

    private readonly NODES: any[] = [
        {id: 1, attributes: {text: 1}, data: {visited: false}},
        {id: 2, attributes: {text: 2}, data: {visited: false}},
        {id: 3, attributes: {text: 3}, data: {visited: false}},
        {id: 4, attributes: {text: 4}, data: {visited: false}},
        {id: 5, attributes: {text: 5}, data: {visited: false}},
        {id: 6, attributes: {text: 6}, data: {visited: false}},
        {id: 7, attributes: {text: 7}, data: {visited: false}},
    ];
    private readonly EDGES: any[] = [
        {id: 1, source: 1, target: 2, data: {visited: false}},
        {id: 3, source: 1, target: 5, data: {visited: false}},

        {id: 5, source: 2, target: 3, data: {visited: false}},
        {id: 7, source: 2, target: 4, data: {visited: false}},

        {id: 9, source: 3, target: 6, data: {visited: false}},

        {id: 11, source: 4, target: 6, data: {visited: false}},

        {id: 13, source: 5, target: 7, data: {visited: false}},

        {id: 15, source: 6, target: 7, data: {visited: false}},
    ];

    private animationSteps: AnimationStep[] = [];

    public ngAfterViewInit(): void {
        this.populateGraph();
        this.generateAnimationSteps();

        this.graphAnimatorComponent.init(this.graphVisualizerComponent, this.animationSteps);
    }

    private populateGraph(): void {
        this.graphVisualizerComponent.setGraph(this.NODES, this.EDGES);
    }

    private generateAnimationSteps(): void {
        const startNode: any = this.graphVisualizerComponent.getNode(1);
        const targetNode: any = this.graphVisualizerComponent.getNode(5);

        this.dfs(startNode, targetNode);
    }

    private dfs(currentNode: any, targetNode: any): boolean {
        this.generateAddClassNameStep(currentNode);

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

            const found = this.dfs(nextNode, targetNode);
            if (found) return true;

            this.generateRemoveClassNameStep(edge);
            edge.setData('visited', true);
        }

        this.generateRemoveClassNameStep(currentNode);
        currentNode.setData('visited', true);

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
