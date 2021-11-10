import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {OgmaClassName, OgmaService} from '../../services/ogma.service';

// @ts-ignore
import * as Ogma from '../../../scripts/ogma.min';

@Component({
    selector: 'app-graph-visualizer',
    templateUrl: './graph-visualizer.component.html',
    styleUrls: ['./graph-visualizer.component.scss'],
})
export class GraphVisualizerComponent implements OnInit {
    @ViewChild('graphElementRef') public graphElementRef!: ElementRef;

    public activeLayout: string = 'grid';

    private ogma: Ogma;

    public constructor(public ogmaService: OgmaService) {}

    public ngOnInit(): void {
        this.initGraph();
    }

    public addNodes(nodes: any[]): void {
        this.ogma.addNodes(nodes);
        this.ogma.getNodes().addClass(OgmaClassName.IDLE);

        this.layoutButtonClickHandler(this.activeLayout).then();
    }

    public addEdges(edges: any[]): void {
        this.ogma.addEdges(edges);
        this.ogma.getEdges().addClass(OgmaClassName.IDLE);

        this.layoutButtonClickHandler(this.activeLayout).then();
    }

    private initGraph(): void {
        this.ogma = new Ogma({container: 'graph-container'});
        this.ogmaService.attachClasses(this.ogma);
        this.ogmaService.setStateAttributes(this.ogma);

        this.ogma.tools.tooltip.onNodeHover((node: any) => {
            return '<p>' + node.getId() + '</p>';
        });
    }

    public async layoutButtonClickHandler(layout: string): Promise<void> {
        switch (layout) {
            case 'grid':
                await this.ogma.layouts.grid({
                    duration: this.ogmaService.ANIMATION_DURATION,
                    locate: true,
                });
                break;
            case 'sequential':
                await this.ogma.layouts.sequential({
                    arrangeComponents: 'grid',
                    componentDistance: this.ogmaService.COMPONENT_DISTANCE,
                    direction: 'TB',
                    duration: this.ogmaService.ANIMATION_DURATION,
                    gridDistance: this.ogmaService.GRID_DISTANCE,
                    levelDistance: this.ogmaService.LEVEL_DISTANCE,
                    locate: true,
                    nodeDistance: this.ogmaService.NODE_DISTANCE,
                });
                break;
            default:
                return;
        }

        this.activeLayout = layout;
    }
}
