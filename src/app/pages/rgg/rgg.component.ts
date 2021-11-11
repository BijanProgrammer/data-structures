import {Component, AfterViewInit, ViewChild} from '@angular/core';

import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

import {Layout} from 'src/app/models/ogma';

@Component({
    selector: 'app-dfs',
    templateUrl: './rgg.component.html',
    styleUrls: ['./rgg.component.scss'],
})
export class RggComponent implements AfterViewInit {
    public Layout = Layout;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    public ngAfterViewInit(): void {
        this.populateGraph();
    }

    private populateGraph(): void {
        const nodesMaximumCount = 20;
        const edgesMaximumCount = 30;

        const nodesCount = Math.floor(Math.random() * nodesMaximumCount) + 1;
        const edgesCount = Math.floor(Math.random() * edgesMaximumCount);

        this.graphVisualizerComponent.addNodes(RggComponent.generateNodes(nodesCount));
        this.graphVisualizerComponent.addEdges(RggComponent.generateEdges(nodesCount, edgesCount));
    }

    private static generateNodes(nodesCount: number): any[] {
        const width = 800;
        const height = 600;

        const nodes = [];
        for (let i = 0; i < nodesCount; i++) {
            const randomX = Math.random() * width - width / 2;
            const randomY = Math.random() * height - height / 2;

            const data = {name: `node #${i}`};
            const attributes = {x: randomX, y: randomY, text: i};

            const node: any = {id: 'n' + i, data, attributes};
            nodes.push(node);
        }

        return nodes;
    }

    private static generateEdges(nodesCount: number, edgesCount: number): any[] {
        const edges = [];
        for (let i = 0; i < edgesCount; i++) {
            const sourceId = 'n' + Math.floor(Math.random() * nodesCount);
            const targetId = 'n' + Math.floor(Math.random() * nodesCount);

            if (sourceId === targetId && nodesCount !== 1) {
                i--;
                continue;
            }

            edges.push({id: 'e' + i, source: sourceId, target: targetId, data: {name: `edge #${i}`}});
        }

        return edges;
    }
}
