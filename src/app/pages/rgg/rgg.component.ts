import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

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

    @ViewChild('fileInput') public fileInput!: ElementRef<HTMLInputElement>;

    private graphGenerator: GraphGenerator = new RandomGraphGenerator();

    public ngAfterViewInit(): void {
        this.populateGraph();
    }

    public regenerateButtonClickHandler(): void {
        this.populateGraph();
    }

    public async downloadButtonClickHandler(): Promise<void> {
        await this.graphVisualizerComponent.exportJson();
    }

    public uploadButtonClickHandler(): void {
        this.fileInput.nativeElement.click();
    }

    public fileInputChangeHandler(): void {
        const {files} = this.fileInput.nativeElement;
        if (!files || files.length === 0) return;

        const reader = new FileReader();
        reader.onload = async (e): Promise<void> => {
            await this.graphVisualizerComponent.importJson(e.target?.result);
        };
        reader.readAsText(files[0], 'UTF-8');
    }

    private populateGraph(): void {
        const {nodes, edges} = this.graphGenerator.generateGraph(this.graphVisualizerComponent);
        this.graphVisualizerComponent.setGraph(nodes, edges);
    }
}
