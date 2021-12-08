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

import {GraphVisualizerComponent} from '../../../components/graph-visualizer/graph-visualizer.component';

import {ClassName, Direction, EdgeList, Layout, NodeList, OgmaAnimationStep, RawGraph} from 'src/app/models/ogma';
import {GraphAnimatorComponent} from '../../../components/graph-animator/graph-animator.component';
import {GraphGenerator} from '../../../models/graph-generator';

@Component({
    selector: 'app-chapter07-example',
    templateUrl: './chapter07-example.component.html',
    styleUrls: ['./chapter07-example.component.scss'],
})
export class Chapter07ExampleComponent implements AfterViewInit {
    public Layout = Layout;
    public Direction = Direction;

    @Input() public graphTitle: string = 'Graph';
    @Input() public graphId: string = 'graph-container';
    @Input() public graphGenerator!: GraphGenerator;
    @Input() public regenerateButtonEnabled: boolean = true;
    @Input() public downloadButtonEnabled: boolean = false;
    @Input() public uploadButtonEnabled: boolean = false;

    @Output() public generateAnimationStepsEventEmitter = new EventEmitter<any>();

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

        this.nodes.toArray()[0].addClass(ClassName.PATH).then();
    }

    private generateAnimationSteps(): void {
        this.animationSteps = [];
        this.generateAnimationStepsEventEmitter.emit({
            animationSteps: this.animationSteps,
            graphVisualizerComponent: this.graphVisualizerComponent,
            head: this.nodes.toArray()[0],
        });
    }
}
