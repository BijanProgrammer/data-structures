import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';

import {GraphVisualizerComponent} from '../graph-visualizer/graph-visualizer.component';

import {ClassName, Layout, OgmaAnimationStep, RawGraph} from 'src/app/models/ogma';
import {GraphAnimatorComponent} from '../graph-animator/graph-animator.component';
import {GraphGenerator} from '../../models/graph-generator';

@Component({
    selector: 'app-graph-search',
    templateUrl: './graph-search.component.html',
    styleUrls: ['./graph-search.component.scss'],
})
export class GraphSearchComponent implements AfterViewInit {
    public Layout = Layout;

    @Input() public graphId: string = 'graph-container';
    @Input() public graphTitle: string = 'Graph';
    @Input() public graphGenerator!: GraphGenerator;
    @Input() public regenerateButtonEnabled: boolean = false;
    @Input() public downloadButtonEnabled: boolean = false;
    @Input() public uploadButtonEnabled: boolean = false;

    @Output() public generateAnimationStepsEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('graphAnimatorComponent', {read: GraphAnimatorComponent})
    public graphAnimatorComponent!: GraphAnimatorComponent;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    @ViewChild('startNodeInput') public startNodeInput!: ElementRef<HTMLInputElement>;
    @ViewChild('targetNodeInput') public targetNodeInput!: ElementRef<HTMLInputElement>;

    public nodes!: any;
    public edges!: any;

    private animationSteps: OgmaAnimationStep[] = [];

    public constructor(private changeDetectorRef: ChangeDetectorRef) {}

    public ngAfterViewInit(): void {
        this.init();
    }

    public regenerateButtonClickHandler(): void {
        this.init();
    }

    public uploadButtonClickHandler(rawGraph: RawGraph): void {
        this.init(rawGraph);
    }

    public formSubmitHandler(event: Event): void {
        event.preventDefault();
        this.initAnimation();
    }

    private get startNodeIndex(): number {
        return +this.startNodeInput.nativeElement.value || 1;
    }

    private get targetNodeIndex(): number {
        return +this.targetNodeInput.nativeElement.value || 1;
    }

    private init(rawGraph?: RawGraph): void {
        this.populateGraph(rawGraph);
        this.initAnimation();
    }

    private populateGraph(rawGraph: RawGraph | undefined): void {
        if (!rawGraph) rawGraph = this.graphGenerator.generateGraph(this.graphVisualizerComponent);

        this.graphVisualizerComponent.setGraph(rawGraph);
        this.nodes = this.graphVisualizerComponent.getNodes();
        this.edges = this.graphVisualizerComponent.getEdges();

        this.changeDetectorRef.detectChanges();
    }

    private initAnimation(): void {
        this.resetNodesAndEdges();
        this.generateAnimationSteps();
        this.graphAnimatorComponent.init(this.animationSteps);
    }

    private resetNodesAndEdges(): void {
        this.nodes.setData('visited', () => false);
        this.edges.setData('visited', () => false);

        [...this.nodes.toArray(), ...this.edges.toArray()].forEach((element) => {
            element.removeClasses(element.getClassList());
            element.addClass(ClassName.IDLE);
        });
    }

    private generateAnimationSteps(): void {
        this.animationSteps = [];

        const startNode: any = this.graphVisualizerComponent.getNode(this.startNodeIndex);
        const targetNode: any = this.graphVisualizerComponent.getNode(this.targetNodeIndex);

        this.generateAnimationStepsEventEmitter.emit({animationSteps: this.animationSteps, startNode, targetNode});
    }
}
