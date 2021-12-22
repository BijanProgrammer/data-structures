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

import {ClassName, EdgeList, Layout, Node, NodeList, OgmaAnimationStep, RawGraph} from 'src/app/models/ogma';
import {GraphAnimatorComponent} from '../graph-animator/graph-animator.component';
import {GraphGenerator} from '../../models/graph-generator';

@Component({
    selector: 'app-graph-search',
    templateUrl: './graph-search.component.html',
    styleUrls: ['./graph-search.component.scss'],
})
export class GraphSearchComponent implements AfterViewInit {
    public Layout = Layout;

    @Input() public graphTitle: string = 'Graph';
    @Input() public graphId: string = 'graph-container';
    @Input() public setLayoutEnabled: boolean = true;
    @Input() public layout: Layout = Layout.RADIAL;
    @Input() public rootId?: number;
    @Input() public graphGenerator!: GraphGenerator;
    @Input() public regenerateButtonEnabled: boolean = false;
    @Input() public downloadButtonEnabled: boolean = false;
    @Input() public uploadButtonEnabled: boolean = false;
    @Input() public formEnabled: boolean = true;

    @Output() public generateAnimationStepsEventEmitter: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('graphAnimatorComponent', {read: GraphAnimatorComponent})
    public graphAnimatorComponent!: GraphAnimatorComponent;

    @ViewChild('graphVisualizerComponent', {read: GraphVisualizerComponent})
    public graphVisualizerComponent!: GraphVisualizerComponent;

    @ViewChild('startNodeInput') public startNodeInput!: ElementRef<HTMLInputElement>;
    @ViewChild('targetNodeInput') public targetNodeInput!: ElementRef<HTMLInputElement>;

    public nodes!: NodeList;
    public edges!: EdgeList;

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
        this.populateGraph(rawGraph).then(() => this.initAnimation());
    }

    private async populateGraph(rawGraph: RawGraph | undefined): Promise<void> {
        if (!rawGraph) rawGraph = this.graphGenerator.generateGraph(this.graphVisualizerComponent);

        await this.graphVisualizerComponent.setGraph(rawGraph);
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

        if (!this.formEnabled) {
            this.generateAnimationStepsEventEmitter.emit({
                animationSteps: this.animationSteps,
                graphVisualizerComponent: this.graphVisualizerComponent,
            });

            return;
        }

        const startNode: Node = this.graphVisualizerComponent.getNode(this.startNodeIndex);
        const targetNode: Node = this.graphVisualizerComponent.getNode(this.targetNodeIndex);

        this.generateAnimationStepsEventEmitter.emit({
            animationSteps: this.animationSteps,
            graphVisualizerComponent: this.graphVisualizerComponent,
            startNode,
            targetNode,
        });
    }
}
