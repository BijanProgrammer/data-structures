import {Component, AfterViewInit, ViewChild} from '@angular/core';

import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

import {Layout} from 'src/app/models/ogma';
import {GraphGenerator, RandomGraphGenerator} from '../../models/graph-generator';

@Component({
    selector: 'app-dfs',
    templateUrl: './rgg.component.html',
    styleUrls: ['./rgg.component.scss'],
})
export class RggComponent implements AfterViewInit {
    public Layout = Layout;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    private graphGenerator: GraphGenerator = new RandomGraphGenerator();

    public ngAfterViewInit(): void {
        this.populateGraph();
    }

    public regenerateButtonClickHandler(): void {
        this.populateGraph();
    }

    private populateGraph(): void {
        const {nodes, edges} = this.graphGenerator.generateGraph(this.graphVisualizerComponent);
        this.graphVisualizerComponent.setGraph(nodes, edges);
    }
}
