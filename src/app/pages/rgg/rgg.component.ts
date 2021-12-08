import {AfterViewInit, Component, ViewChild} from '@angular/core';

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

    public async ngAfterViewInit(): Promise<void> {
        await this.populateGraph();
    }

    public async regenerateButtonClickHandler(): Promise<void> {
        await this.populateGraph();
    }

    private async populateGraph(): Promise<void> {
        const rawGraph = this.graphGenerator.generateGraph(this.graphVisualizerComponent);
        await this.graphVisualizerComponent.setGraph(rawGraph);
    }
}
