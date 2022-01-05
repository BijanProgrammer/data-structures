import {Component} from '@angular/core';
import {SimpleAvlTreeGenerator} from '../../models/graph-generator';
import {ClassName, Edge, Layout, Node, OgmaAnimationActionType, OgmaAnimationStep} from '../../models/ogma';
import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';
import {OgmaService} from '../../services/ogma.service';

@Component({
    selector: 'app-avl',
    templateUrl: './avl.component.html',
    styleUrls: ['./avl.component.scss'],
})
export class AvlComponent {
    public Layout = Layout;

    public randomTreeGenerator = new SimpleAvlTreeGenerator();
    public methods: string[] = ['leftRotation', 'rightRotation', 'leftRightRotation', 'rightLeftRotation', 'add'];

    private animationSteps!: OgmaAnimationStep[];
    private graphVisualizerComponent!: GraphVisualizerComponent;

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(
        payload: {
            animationSteps: OgmaAnimationStep[];
            graphVisualizerComponent: GraphVisualizerComponent;
            form: HTMLFormElement;
        },
        method: string
    ): void {
        this.animationSteps = payload.animationSteps;
        this.graphVisualizerComponent = payload.graphVisualizerComponent;

        const {value} = payload.form.elements.namedItem('value') as HTMLInputElement;

        switch (method) {
            case 'leftRotation':
                this.leftRotation(+value);
                break;
            // case 'rightRotation':
            //     this.rightRotation(+value);
            //     break;
            // case 'leftRightRotation':
            //     this.leftRightRotation(+value);
            //     break;
            // case 'rightLeftRotation':
            //     this.rightLeftRotation(+value);
            //     break;
            // case 'add':
            //     this.add(+value);
            //     break;
        }
    }

    private leftRotation(x: number): void {
        const node = this.graphVisualizerComponent.getNodeByText(x.toString())!;
        const right = this.nodeOnTheRightOf(node);
        if (!right) return;

        const actions = [];

        const edgeFromParentToNode = node.getAdjacentEdges({direction: 'in'}).toArray()[0];
        if (edgeFromParentToNode) {
            actions.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(edgeFromParentToNode),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(1, edgeFromParentToNode.getSource(), right),
                },
                {
                    element: right,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {path: 'index', oldData: right.getData('index'), newData: node.getData('index')},
                }
            );
        }

        const rightLeft = this.nodeOnTheLeftOf(right);
        if (rightLeft) {
            actions.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(rightLeft.getAdjacentEdges({direction: 'in'}).toArray()[0]),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(2, node, rightLeft),
                },
                {
                    element: rightLeft,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {path: 'index', oldData: rightLeft.getData('index'), newData: 1},
                }
            );
        }

        actions.push(
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.REMOVE_EDGE,
                actionData: this.edgeRawData(right.getAdjacentEdges({direction: 'in'}).toArray()[0]),
            },
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.ADD_EDGE,
                actionData: this.newEdgeRawData(3, right, node),
            },
            {
                element: node,
                actionType: OgmaAnimationActionType.SET_DATA,
                actionData: {path: 'index', oldData: node.getData('index'), newData: 0},
            }
        );

        this.animationSteps.push({actions});

        console.log(this.animationSteps);
    }

    // private add(x: number): void {
    //     let node = this.graphVisualizerComponent.getNode(1);
    //     const nodeId = this.graphVisualizerComponent.getNodes().size + 1;
    //     const edgeId = this.graphVisualizerComponent.getEdges().size + 1;
    //
    //     while (true) {
    //         const currentIndex = node.getId();
    //         const currentValue = +node.getAttribute('text');
    //
    //         this.markAsVisited(currentIndex);
    //         const {left, right} = this.right(currentIndex);
    //
    //         if (x <= currentValue) {
    //             if (!left) {
    //                 this.addNode(node, 0, nodeId, edgeId, x);
    //                 return;
    //             }
    //
    //             node = this.graphVisualizerComponent.getNode(left);
    //         } else {
    //             if (!right) {
    //                 this.addNode(node, 1, nodeId, edgeId, x);
    //                 return;
    //             }
    //
    //             node = this.graphVisualizerComponent.getNode(right);
    //         }
    //     }
    // }

    private nodeOnTheRightOf(node: Node): Node | undefined {
        const [first, second]: Edge[] = node.getAdjacentEdges({direction: 'out'}).toArray();

        const firstIndex = first?.getTarget().getData('index');
        const secondIndex = second?.getTarget().getData('index');

        if (firstIndex === 1) return first.getTarget();
        if (secondIndex === 1) return second.getTarget();

        return undefined;
    }

    private nodeOnTheLeftOf(node: Node): Node | undefined {
        const [first, second]: Edge[] = node.getAdjacentEdges({direction: 'out'}).toArray();

        const firstIndex = first?.getTarget().getData('index');
        const secondIndex = second?.getTarget().getData('index');

        if (firstIndex === 0) return first.getTarget();
        if (secondIndex === 0) return second.getTarget();

        return undefined;
    }

    // private markAsVisited(index: number): void {
    //     const element: Node = this.graphVisualizerComponent.getNode(index);
    //
    //     this.animationSteps.push({
    //         actions: [
    //             {element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className: ClassName.SECONDARY}},
    //         ],
    //     });
    // }

    // private addNode(parent: Node, index: number, nodeId: number, edgeId: number, value: number): void {
    //     const node = {id: nodeId, attributes: {text: value.toString()}, data: {index}};
    //     const edge = {id: edgeId, source: parent.getId(), target: nodeId, data: {}};
    //
    //     this.animationSteps.push({
    //         actions: [
    //             {element: parent, actionType: OgmaAnimationActionType.ADD_NODE, actionData: node},
    //             {element: parent, actionType: OgmaAnimationActionType.ADD_EDGE, actionData: edge},
    //             {
    //                 element: parent,
    //                 actionType: OgmaAnimationActionType.ADD_CLASS_BY_ID,
    //                 actionData: {id: nodeId, className: ClassName.PATH},
    //             },
    //         ],
    //     });
    // }

    private nodeRawData(node: Node): any {
        return {id: node.getId(), attributes: {text: node.getAttribute('text')}, data: {index: +node.getData('index')}};
    }

    private edgeRawData(edge: Edge): any {
        return {id: edge.getId(), source: edge.getSource().getId(), target: edge.getTarget().getId(), data: {}};
    }

    private newEdgeRawData(idOffset: number, source: Node, target: Node): any {
        return {
            id: this.graphVisualizerComponent.getEdges().size + idOffset,
            source: source.getId(),
            target: target.getId(),
            data: {},
        };
    }
}
