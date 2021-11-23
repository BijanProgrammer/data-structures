import {AfterViewInit, Component, ViewChild} from '@angular/core';

import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';

import {Layout} from 'src/app/models/ogma';
import {GraphGenerator, RandomTreeGenerator} from '../../models/graph-generator';

@Component({
    selector: 'app-dfs',
    templateUrl: './rtg.component.html',
    styleUrls: ['./rtg.component.scss'],
})
export class RtgComponent implements AfterViewInit {
    public Layout = Layout;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    private treeGenerator: GraphGenerator = new RandomTreeGenerator();

    public ngAfterViewInit(): void {
        this.populateGraph();
    }

    public regenerateButtonClickHandler(): void {
        this.populateGraph();
    }

    private populateGraph(): void {
        const rawGraph = this.treeGenerator.generateGraph(this.graphVisualizerComponent);
        this.graphVisualizerComponent.setGraph(rawGraph);
    }
}
