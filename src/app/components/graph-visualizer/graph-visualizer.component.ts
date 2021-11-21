import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

import {OgmaService} from '../../services/ogma.service';

// @ts-ignore
import * as Ogma from '../../../scripts/ogma.min';
import {ClassName, Layout, RawGraph, Selector} from '../../models/ogma';

@Component({
    selector: 'app-graph-visualizer',
    templateUrl: './graph-visualizer.component.html',
    styleUrls: ['./graph-visualizer.component.scss'],
})
export class GraphVisualizerComponent implements AfterViewInit {
    public Layout = Layout;
    public Selector = Selector;

    @ViewChild('graphElementRef') public graphElementRef!: ElementRef;

    @Input() public graphId: string = 'graph-container';
    @Input() public layout: Layout = Layout.GRID;
    @Input() public isDirected: boolean = false;

    public selector: Selector = Selector.DEFAULT;
    public isSnappingEnabled = false;

    private ogma: Ogma;

    public constructor(public ogmaService: OgmaService) {}

    public ngAfterViewInit(): void {
        this.initGraph();
    }

    public getNodes(selector?: any): any {
        return this.ogma.getNodes(selector);
    }

    public getNode(nodeId: any): any {
        return this.ogma.getNode(nodeId);
    }

    public getEdges(selector?: any): any {
        return this.ogma.getEdges(selector);
    }

    public getEdge(edgeId: any): any {
        return this.ogma.getEdge(edgeId);
    }

    public setGraph(rawGraph: RawGraph): void {
        this.ogma.setGraph(rawGraph);

        this.ogma.getNodes().addClass(ClassName.IDLE);
        this.ogma.getEdges().addClass(ClassName.IDLE);

        this.setLayout(this.layout).then();
    }

    public addNodes(nodes: any[]): void {
        this.ogma.addNodes(nodes);
        this.ogma.getNodes().addClass(ClassName.IDLE);

        this.setLayout(this.layout).then();
    }

    public addEdges(edges: any[]): void {
        this.ogma.addEdges(edges);
        this.ogma.getEdges().addClass(ClassName.IDLE);

        this.setLayout(this.layout).then();
    }

    public async layoutButtonClickHandler(layout: Layout): Promise<void> {
        if (this.layout === layout) return;

        await this.setLayout(layout);
    }

    public selectorButtonClickHandler(selector: Selector): void {
        if (this.selector === selector) return;

        this.selector = selector;

        switch (selector) {
            case Selector.DEFAULT:
                this.ogma.tools.rectangleSelect.disable();
                this.ogma.tools.lasso.disable();
                break;
            case Selector.RECTANGLE:
                this.ogma.tools.rectangleSelect.enable({callback: this.selectorCallback.bind(this)});
                break;
            case Selector.LASSO:
                this.ogma.tools.lasso.enable({callback: this.selectorCallback.bind(this)});
                break;
        }
    }

    public snappingButtonClickHandler(): void {
        this.isSnappingEnabled = !this.isSnappingEnabled;

        if (this.isSnappingEnabled) this.ogma.tools.snapping.enable({tolerance: 100});
        else this.ogma.tools.snapping.disable();
    }

    public async exportJson(): Promise<string> {
        return await this.ogma.export.json();
    }

    public async importJson(content: string): Promise<RawGraph | undefined> {
        if (!content) return undefined;

        const rawGraph = await this.ogma.parse.json(content);
        this.setGraph(rawGraph);

        return rawGraph;
    }

    private initGraph(): void {
        this.ogma = new Ogma({
            container: this.graphId,
            options: {
                directedEdges: false,
                interactions: {zoom: {modifier: 1.5, onDoubleClick: true}},
            },
        });

        this.ogmaService.attachClasses(this.ogma, this.isDirected);
        this.ogmaService.setStateAttributes(this.ogma);

        // TODO: tooltip
        // this.ogma.tools.tooltip.onNodeHover((node: any) => {
        //     return '<p>' + node.getId() + '</p>';
        // });
    }

    private async setLayout(layout: Layout): Promise<void> {
        this.layout = layout;
        await this.ogmaService.setLayout(this.ogma, this.layout, this.ogma.getNodes().get(0));
    }

    private selectorCallback({nodes, edges}: {nodes: any; edges: any}): void {
        nodes.setSelected(true);
        edges.setSelected(true);

        this.selector = Selector.DEFAULT;
    }
}
