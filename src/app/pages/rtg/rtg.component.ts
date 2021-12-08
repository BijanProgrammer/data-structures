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

    public async ngAfterViewInit(): Promise<void> {
        await this.populateGraph();
    }

    public async regenerateButtonClickHandler(): Promise<void> {
        await this.populateGraph();
    }

    private async populateGraph(): Promise<void> {
        const rawGraph = this.treeGenerator.generateGraph(this.graphVisualizerComponent);
        await this.graphVisualizerComponent.setGraph(rawGraph);
    }
}
