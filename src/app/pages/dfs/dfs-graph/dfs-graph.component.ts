import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';

import {GraphVisualizerComponent} from '../../../components/graph-visualizer/graph-visualizer.component';

import {OgmaAnimationActionType, OgmaAnimationStep, ClassName, Layout} from 'src/app/models/ogma';
import {GraphAnimatorComponent} from '../../../components/graph-animator/graph-animator.component';
import {GraphGenerator} from '../../../models/graph-generator';

@Component({
    selector: 'app-dfs-graph',
    templateUrl: './dfs-graph.component.html',
    styleUrls: ['./dfs-graph.component.scss'],
})
export class DfsGraphComponent implements AfterViewInit {
    public Layout = Layout;

    @Input() public graphId: string = 'graph-container';
    @Input() public graphTitle: string = 'Graph';
    @Input() public graphGenerator!: GraphGenerator;
    @Input() public isRegenerationEnabled: boolean = false;

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

    private init(): void {
        this.populateGraph();
        this.initAnimation();
    }

    private populateGraph(): void {
        const {nodes, edges} = this.graphGenerator.generateGraph(this.graphVisualizerComponent);

        this.graphVisualizerComponent.setGraph(nodes, edges);
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

        this.dfs(startNode, targetNode);
    }

    private dfs(currentNode: any, targetNode: any): boolean {
        this.generateAddClassNameStep(currentNode);
        currentNode.setData('visited', true);

        if (currentNode === targetNode) return true;

        const edges: any[] = currentNode.getAdjacentEdges({direction: 'out'}).toArray();
        for (const edge of edges) {
            if (edge.getData('visited')) continue;

            const nextNode = edge.getTarget();
            if (nextNode.getData('visited')) {
                this.generateAddClassNameStep(edge, ClassName.DISABLED);
                continue;
            }

            this.generateAddClassNameStep(edge);
            edge.setData('visited', true);

            const found = this.dfs(nextNode, targetNode);
            if (found) return true;

            this.generateRemoveClassNameStep(edge);
        }

        this.generateRemoveClassNameStep(currentNode);

        return false;
    }

    private generateAddClassNameStep(element: any, className: ClassName = ClassName.PATH): void {
        this.animationSteps.push({
            actions: [{element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className}}],
        });
    }

    private generateRemoveClassNameStep(element: any): void {
        this.animationSteps.push({
            actions: [
                {element, actionType: OgmaAnimationActionType.REMOVE_CLASS, actionData: {className: ClassName.PATH}},
                {element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className: ClassName.DISABLED}},
            ],
        });
    }
}
