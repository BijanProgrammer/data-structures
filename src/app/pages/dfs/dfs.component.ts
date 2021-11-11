import {Component, AfterViewInit, ViewChild} from '@angular/core';

import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

import {ClassName, Layout} from 'src/app/models/ogma';

@Component({
    selector: 'app-dfs',
    templateUrl: './dfs.component.html',
    styleUrls: ['./dfs.component.scss'],
})
export class DfsComponent implements AfterViewInit {
    public Layout = Layout;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    private readonly NODES: any[] = [
        {id: 1, attributes: {text: 1}},
        {id: 2, attributes: {text: 2}},
        {id: 3, attributes: {text: 3}},
        {id: 4, attributes: {text: 4}},
        {id: 5, attributes: {text: 5}},
        {id: 6, attributes: {text: 6}},
        {id: 7, attributes: {text: 7}},
    ];
    private readonly EDGES: any[] = [
        {id: 1, source: 1, target: 2},
        {id: 3, source: 1, target: 5},

        {id: 5, source: 2, target: 3},
        {id: 7, source: 2, target: 4},

        {id: 9, source: 3, target: 6},

        {id: 11, source: 4, target: 6},

        {id: 13, source: 5, target: 7},

        {id: 15, source: 6, target: 7},
    ];

    public ngAfterViewInit(): void {
        this.populateGraph();
    }

    private populateGraph(): void {
        this.graphVisualizerComponent.setGraph(this.NODES, this.EDGES);
    }

    public async playButtonClickHandler(): Promise<void> {
        const startNode: any = this.graphVisualizerComponent.getNode(1);
        const targetNode: any = this.graphVisualizerComponent.getNode(5);

        await this.dfs(startNode, targetNode);
    }

    private async dfs(currentNode: any, targetNode: any): Promise<boolean> {
        currentNode.addClass(ClassName.PATH);
        await this.waitForIt();

        if (currentNode === targetNode) return true;

        const edges: any[] = currentNode.getAdjacentEdges({direction: 'out'}).toArray();
        for (const edge of edges) {
            edge.addClass(ClassName.PATH);
            await this.waitForIt();

            const found = await this.dfs(edge.getTarget(), targetNode);
            if (found) return true;

            edge.removeClass(ClassName.PATH);
            await this.waitForIt();
        }

        currentNode.removeClass(ClassName.PATH);
        await this.waitForIt();

        return false;
    }

    private async waitForIt(duration: number = 500): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, duration);
        });
    }
}
