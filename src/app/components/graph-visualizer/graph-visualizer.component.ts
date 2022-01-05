import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

import {OgmaService} from '../../services/ogma.service';

// @ts-ignore
import * as Ogma from '../../../scripts/ogma.min';
import {
    ClassName,
    Direction,
    Element,
    Edge,
    EdgeList,
    Layout,
    Node,
    NodeList,
    RawGraph,
    Selector,
} from '../../models/ogma';

@Component({
    selector: 'app-graph-visualizer',
    templateUrl: './graph-visualizer.component.html',
    styleUrls: ['./graph-visualizer.component.scss'],
})
export class GraphVisualizerComponent implements AfterViewInit {
    public Layout = Layout;
    public Direction = Direction;
    public Selector = Selector;

    @ViewChild('graphElementRef') public graphElementRef!: ElementRef;

    @Input() public graphId: string = 'graph-container';
    @Input() public setLayoutEnabled: boolean = true;
    @Input() public layout: Layout = Layout.GRID;
    @Input() public rootId?: number;
    @Input() public direction: Direction = Direction.TB;
    @Input() public isDirected: boolean = false;

    public selector: Selector = Selector.DEFAULT;
    public isSnappingEnabled = false;
    public isRewiringEnabled = false;
    public isConnectNodesEnabled = false;

    private ogma: Ogma;

    public constructor(public ogmaService: OgmaService) {}

    public ngAfterViewInit(): void {
        this.initGraph();
    }

    public isDirectionSettingsDisabled(layout: Layout): boolean {
        return ![Layout.SEQUENTIAL, Layout.HIERARCHICAL].includes(layout);
    }

    public getNodes(selector?: any): NodeList {
        return this.ogma.getNodes(selector);
    }

    public getNode(nodeId: any): Node {
        return this.ogma.getNode(nodeId);
    }

    public getNodeByText(text: string): Node | undefined {
        return this.getNodes()
            .toArray()
            .find((x) => x.getAttribute('text') === text);
    }

    public getEdges(selector?: any): EdgeList {
        return this.ogma.getEdges(selector);
    }

    public getEdge(edgeId: any): Edge {
        return this.ogma.getEdge(edgeId);
    }

    public async setGraph(rawGraph: RawGraph): Promise<void> {
        this.ogma.setGraph(rawGraph);

        this.ogma.getNodes().addClass(ClassName.IDLE);
        this.ogma.getEdges().addClass(ClassName.IDLE);

        await this.setLayout(this.layout);
    }

    public addNode(
        data: {id: any; attributes?: any; data?: any; edge?: {id: any; source: any; target: any; data?: any}},
        redraw: boolean = true
    ): Node {
        const addedNode: Node = this.ogma.addNode({...data});
        addedNode.addClass(ClassName.IDLE).then();

        if (data.edge) this.ogma.addEdge({...data.edge});

        // if (redraw)
        this.setLayout(this.layout).then();

        return addedNode;
    }

    public addEdge(data: {id: any; source: any; target: any; data?: any}, redraw: boolean = true): void {
        const addedEdge: Edge = this.ogma.addEdge({...data});
        addedEdge.addClass(ClassName.IDLE).then();

        // if (redraw)
        this.setLayout(this.layout).then();
    }

    public removeElement(element: Element<Node | Edge, NodeList | EdgeList>, redraw: boolean = true): void {
        if (element.isNode) this.ogma.removeNode(element);
        else this.ogma.removeEdge(element);

        // if (redraw)
        this.setLayout(this.layout).then();
    }

    public addNodes(nodes: Node[]): void {
        this.ogma.addNodes(nodes);
        this.ogma.getNodes().addClass(ClassName.IDLE);

        this.setLayout(this.layout).then();
    }

    public addEdges(edges: Edge[]): void {
        this.ogma.addEdges(edges);
        this.ogma.getEdges().addClass(ClassName.IDLE);

        this.setLayout(this.layout).then();
    }

    public async layoutButtonClickHandler(layout: Layout): Promise<void> {
        if (this.layout === layout) return;

        await this.setLayout(layout);
    }

    public async directionButtonClickHandler(direction: Direction): Promise<void> {
        if (this.direction === direction) return;
        this.direction = direction;

        await this.setLayout();
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

    public rewiringButtonClickHandler(): void {
        this.isRewiringEnabled = !this.isRewiringEnabled;

        if (this.isRewiringEnabled) this.ogma.tools.rewire.enable();
        else this.ogma.tools.rewire.disable();
    }

    public connectNodesButtonClickHandler(): void {
        this.isConnectNodesEnabled = !this.isConnectNodesEnabled;

        if (this.isConnectNodesEnabled) this.ogma.tools.connectNodes.enable();
        else this.ogma.tools.connectNodes.disable();
    }

    public async exportJson(): Promise<string> {
        return await this.ogma.export.json();
    }

    public async importJson(content: string): Promise<RawGraph | undefined> {
        if (!content) return undefined;

        const rawGraph = await this.ogma.parse.json(content);
        await this.setGraph(rawGraph);

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
        // this.ogma.tools.tooltip.onNodeHover((node: Node) => {
        //     return '<p>' + node.getId() + '</p>';
        // });
    }

    private async setLayout(layout?: Layout): Promise<void> {
        if (!this.setLayoutEnabled) return;

        if (layout) this.layout = layout;

        await this.ogmaService.setLayout(this.ogma, this.layout, this.getNode(this.rootId ?? 1), this.direction);
    }

    private selectorCallback({nodes, edges}: {nodes: NodeList; edges: EdgeList}): void {
        nodes.setSelected(true);
        edges.setSelected(true);

        this.selector = Selector.DEFAULT;
    }
}
