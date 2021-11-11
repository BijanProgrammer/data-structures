import {Component, AfterViewInit, ViewChild} from '@angular/core';

import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

import {Layout} from 'src/app/models/ogma';

@Component({
    selector: 'app-dfs',
    templateUrl: './dfs.component.html',
    styleUrls: ['./dfs.component.scss'],
})
export class DfsComponent implements AfterViewInit {
    public Layout = Layout;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    public ngAfterViewInit(): void {
        this.populateGraph();
    }

    private populateGraph(): void {
        this.graphVisualizerComponent.setGraph(DfsComponent.generateNodes(), DfsComponent.generateEdges());
    }

    private static generateNodes(): any[] {
        return [
            {id: 1, attributes: {text: 1}},
            {id: 2, attributes: {text: 2}},
            {id: 3, attributes: {text: 3}},
            {id: 4, attributes: {text: 4}},
            {id: 5, attributes: {text: 5}},
            {id: 6, attributes: {text: 6}},
            {id: 7, attributes: {text: 7}},
        ];
    }

    private static generateEdges(): any[] {
        return [
            {id: 1, source: 1, target: 2},
            {id: 3, source: 1, target: 5},

            {id: 5, source: 2, target: 3},
            {id: 7, source: 2, target: 4},

            {id: 9, source: 3, target: 6},

            {id: 11, source: 4, target: 6},

            {id: 13, source: 5, target: 7},

            {id: 15, source: 6, target: 7},
        ];
    }
}
