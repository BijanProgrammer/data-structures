import {Component} from '@angular/core';
import {SimpleBinarySearchTreeGenerator} from '../../models/graph-generator';
import {ClassName, Edge, Layout, Node, OgmaAnimationActionType, OgmaAnimationStep} from '../../models/ogma';
import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';
import {OgmaService} from '../../services/ogma.service';

@Component({
    selector: 'app-binary-search-tree',
    templateUrl: './binary-search-tree.component.html',
    styleUrls: ['./binary-search-tree.component.scss'],
})
export class BinarySearchTreeComponent {
    public Layout = Layout;

    public randomTreeGenerator = new SimpleBinarySearchTreeGenerator();
    public methods: string[] = ['add'];

    private animationSteps!: OgmaAnimationStep[];
    private graphVisualizerComponent!: GraphVisualizerComponent;

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(
        payload: {
            animationSteps: OgmaAnimationStep[];
            graphVisualizerComponent: GraphVisualizerComponent;
        },
        method: string
    ): void {
        this.animationSteps = payload.animationSteps;
        this.graphVisualizerComponent = payload.graphVisualizerComponent;

        switch (method) {
            case 'add':
                this.add(Math.floor(Math.random() * 20));
                break;
        }
    }

    private add(x: number): void {
        console.info(`adding ${x} to the tree ...`);

        let node = this.graphVisualizerComponent.getNode(1);
        const nodeId = this.graphVisualizerComponent.getNodes().size + 1;
        const edgeId = this.graphVisualizerComponent.getEdges().size + 1;

        while (true) {
            const currentIndex = node.getId();
            const currentValue = +node.getAttribute('text');

            this.markAsVisited(currentIndex);
            const {left, right} = this.leftAndRight(currentIndex);

            if (x <= currentValue) {
                if (!left) {
                    this.addNode(node, 0, nodeId, edgeId, x);
                    return;
                }

                node = this.graphVisualizerComponent.getNode(left);
            } else {
                if (!right) {
                    this.addNode(node, 1, nodeId, edgeId, x);
                    return;
                }

                node = this.graphVisualizerComponent.getNode(right);
            }
        }
    }

    private leftAndRight(index: number): {left: number | undefined; right: number | undefined} {
        let left;
        let right;

        const node = this.graphVisualizerComponent.getNode(index);
        const [first, second]: Edge[] = node.getAdjacentEdges({direction: 'out'}).toArray();

        const firstIndex = first?.getTarget().getData('index');
        const secondIndex = second?.getTarget().getData('index');

        if (firstIndex === 0) left = first.getTarget().getId();
        if (secondIndex === 0) left = second.getTarget().getId();

        if (firstIndex === 1) right = first.getTarget().getId();
        if (secondIndex === 1) right = second.getTarget().getId();

        return {left, right};
    }

    private markAsVisited(index: number): void {
        const element: Node = this.graphVisualizerComponent.getNode(index);

        this.animationSteps.push({
            actions: [
                {element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className: ClassName.SECONDARY}},
            ],
        });
    }

    private addNode(parent: Node, index: number, nodeId: number, edgeId: number, value: number): void {
        const node = {id: nodeId, attributes: {text: value.toString()}, data: {index}};
        const edge = {id: edgeId, source: parent.getId(), target: nodeId, data: {}};

        this.animationSteps.push({
            actions: [
                {element: parent, actionType: OgmaAnimationActionType.ADD_NODE, actionData: node},
                {element: parent, actionType: OgmaAnimationActionType.ADD_EDGE, actionData: edge},
                {
                    element: parent,
                    actionType: OgmaAnimationActionType.ADD_CLASS_BY_ID,
                    actionData: {id: nodeId, className: ClassName.PATH},
                },
            ],
        });
    }
}
