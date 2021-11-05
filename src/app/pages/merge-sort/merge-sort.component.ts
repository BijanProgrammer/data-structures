import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

// @ts-ignore
import * as Ogma from '../../../scripts/ogma.min.js';

@Component({
    selector: 'app-merge-sort',
    templateUrl: './merge-sort.component.html',
    styleUrls: ['./merge-sort.component.scss'],
})
export class MergeSortComponent implements OnInit {
    private readonly NODES_MAXIMUM_COUNT = 10;

    @ViewChild('graphElementRef') public graphElementRef!: ElementRef;

    private ogma: Ogma;
    private nodes: any[] = [];
    private edges: any[] = [];
    private nodesCount: number = 0;
    private edgesCount: number = 0;

    public ngOnInit(): void {
        this.initGraph();
    }

    private initGraph(): void {
        this.ogma = new Ogma({container: 'graph'});

        const width = this.ogma.getContainer().offsetWidth;
        const height = this.ogma.getContainer().offsetHeight;

        this.nodesCount = Math.floor(Math.random() * this.NODES_MAXIMUM_COUNT) + 1;
        this.edgesCount = Math.floor(Math.random() * this.NODES_MAXIMUM_COUNT);

        this.nodes = [];
        for (let i = 0; i < this.nodesCount; i++) {
            const randomX = Math.random() * width - width / 2;
            const randomY = Math.random() * height - height / 2;

            const data = {name: 'Node ' + i};
            const attributes = {x: randomX, y: randomY, radius: 20, shape: 'square'};

            const node = {id: 'n' + i, data, attributes};
            this.nodes.push(node);
        }
        this.ogma.addNodes(this.nodes);

        this.edges = [];
        for (let i = 0; i < this.edgesCount; i++) {
            const sourceId = 'n' + Math.floor(Math.random() * this.nodesCount);
            const targetId = 'n' + Math.floor(Math.random() * this.nodesCount);

            if (sourceId === targetId && this.nodesCount !== 1) {
                i--;
                continue;
            }

            this.edges.push({id: 'e' + i, source: sourceId, target: targetId, data: {name: 'parent'}});
        }
        this.ogma.addEdges(this.edges);
    }
}
