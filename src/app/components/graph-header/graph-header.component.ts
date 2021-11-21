import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {GraphVisualizerComponent} from '../graph-visualizer/graph-visualizer.component';
import {RawGraph} from '../../models/ogma';

@Component({
    selector: 'app-graph-header',
    templateUrl: './graph-header.component.html',
    styleUrls: ['./graph-header.component.scss'],
})
export class GraphHeaderComponent {
    @Input() public graphTitle: string = 'Graph';

    @Input() public graphVisualizerComponent!: GraphVisualizerComponent;

    @Input() public regenerateButtonEnabled: boolean = false;
    @Input() public downloadButtonEnabled: boolean = false;
    @Input() public uploadButtonEnabled: boolean = false;

    @Output() public regenerateButtonClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() public downloadButtonClick: EventEmitter<void> = new EventEmitter<void>();
    @Output() public uploadButtonClick: EventEmitter<RawGraph> = new EventEmitter<RawGraph>();

    @ViewChild('fileInput') public fileInput!: ElementRef<HTMLInputElement>;

    public regenerateButtonClickHandler(): void {
        this.regenerateButtonClick.emit();
    }

    public async downloadButtonClickHandler(): Promise<void> {
        await this.graphVisualizerComponent.exportJson();
        this.downloadButtonClick.emit();
    }

    public uploadButtonClickHandler(): void {
        this.fileInput.nativeElement.click();
    }

    public fileInputChangeHandler(): void {
        const {files} = this.fileInput.nativeElement;
        if (!files || files.length === 0) return;

        const reader = new FileReader();
        reader.onload = async (e): Promise<void> => {
            const content = e.target?.result?.toString();
            if (!content) return;

            const graph = await this.graphVisualizerComponent.importJson(content);
            this.uploadButtonClick.emit(graph);
        };
        reader.readAsText(files[0], 'UTF-8');
    }
}
