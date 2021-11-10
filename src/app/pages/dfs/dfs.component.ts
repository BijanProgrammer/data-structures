import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

@Component({
    selector: 'app-dfs',
    templateUrl: './dfs.component.html',
    styleUrls: ['./dfs.component.scss'],
})
export class DfsComponent implements AfterViewInit {
    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    public ngAfterViewInit(): void {
        const nodesMaximumCount = 20;
        const edgesMaximumCount = 30;

        const width = 800;
        const height = 600;

        const nodesCount = Math.floor(Math.random() * nodesMaximumCount) + 1;
        const edgesCount = Math.floor(Math.random() * edgesMaximumCount);

        const nodes = [];
        for (let i = 0; i < nodesCount; i++) {
            const randomX = Math.random() * width - width / 2;
            const randomY = Math.random() * height - height / 2;

            const data = {name: `node #${i}`};
            const attributes = {x: randomX, y: randomY, text: i};

            const node: any = {id: 'n' + i, data, attributes};
            nodes.push(node);
        }

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

        this.graphVisualizerComponent.addNodes(nodes);
        this.graphVisualizerComponent.addEdges(edges);
    }
}
