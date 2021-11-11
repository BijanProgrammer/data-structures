import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

import {OgmaService} from '../../services/ogma.service';

// @ts-ignore
import * as Ogma from '../../../scripts/ogma.min';
import {ClassName, Layout} from '../../models/ogma';

@Component({
    selector: 'app-graph-visualizer',
    templateUrl: './graph-visualizer.component.html',
    styleUrls: ['./graph-visualizer.component.scss'],
})
export class GraphVisualizerComponent implements AfterViewInit {
    public Layout = Layout;

    @ViewChild('graphElementRef') public graphElementRef!: ElementRef;

    @Input() public graphId: string = 'graph-container';
    @Input() public layout: Layout = Layout.GRID;
    @Input() public isDirected: boolean = false;

    private ogma: Ogma;

    public constructor(public ogmaService: OgmaService) {}

    public ngAfterViewInit(): void {
        this.initGraph();
    }

    public getNode(nodeId: any): any {
        return this.ogma.getNode(nodeId);
    }

    public setGraph(nodes: any[], edges: any[]): void {
        this.ogma.setGraph({nodes, edges});

        this.ogma.getNodes().addClass(ClassName.IDLE);
        this.ogma.getEdges().addClass(ClassName.IDLE);

        this.layoutButtonClickHandler(this.layout).then();
    }

    public addNodes(nodes: any[]): void {
        this.ogma.addNodes(nodes);
        this.ogma.getNodes().addClass(ClassName.IDLE);

        this.layoutButtonClickHandler(this.layout).then();
    }

    public addEdges(edges: any[]): void {
        this.ogma.addEdges(edges);
        this.ogma.getEdges().addClass(ClassName.IDLE);

        this.layoutButtonClickHandler(this.layout).then();
    }

    private initGraph(): void {
        this.ogma = new Ogma({container: this.graphId, options: {directedEdges: false}});
        this.ogmaService.attachClasses(this.ogma, this.isDirected);
        this.ogmaService.setStateAttributes(this.ogma);

        // TODO: tooltip
        // this.ogma.tools.tooltip.onNodeHover((node: any) => {
        //     return '<p>' + node.getId() + '</p>';
        // });
    }

    public async layoutButtonClickHandler(layout: Layout): Promise<void> {
        this.layout = layout;
        await this.ogmaService.setLayout(this.ogma, this.layout, this.ogma.getNodes().get(0));
    }
}
