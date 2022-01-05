import {Component} from '@angular/core';
import {BigAvlTreeGenerator} from '../../models/graph-generator';
import {Edge, Layout, Node, OgmaAnimationActionType, OgmaAnimationStep} from '../../models/ogma';
import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';
import {OgmaService} from '../../services/ogma.service';

@Component({
    selector: 'app-avl',
    templateUrl: './avl.component.html',
    styleUrls: ['./avl.component.scss'],
})
export class AvlComponent {
    public Layout = Layout;

    public randomTreeGenerator = new BigAvlTreeGenerator();
    public methods: string[] = ['leftRotation', 'rightRotation', 'leftRightRotation', 'rightLeftRotation'];

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
            case 'rightRotation':
                this.rightRotation(+value);
                break;
            case 'leftRightRotation':
                this.leftRightRotation(+value);
                break;
            case 'rightLeftRotation':
                this.rightLeftRotation(+value);
                break;
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
    }

    private rightRotation(x: number): void {
        const node = this.graphVisualizerComponent.getNodeByText(x.toString())!;
        const left = this.nodeOnTheLeftOf(node);
        if (!left) return;

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
                    actionData: this.newEdgeRawData(1, edgeFromParentToNode.getSource(), left),
                },
                {
                    element: left,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {path: 'index', oldData: left.getData('index'), newData: node.getData('index')},
                }
            );
        }

        const leftRight = this.nodeOnTheRightOf(left);
        if (leftRight) {
            actions.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(leftRight.getAdjacentEdges({direction: 'in'}).toArray()[0]),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(2, node, leftRight),
                },
                {
                    element: leftRight,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {path: 'index', oldData: leftRight.getData('index'), newData: 0},
                }
            );
        }

        actions.push(
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.REMOVE_EDGE,
                actionData: this.edgeRawData(left.getAdjacentEdges({direction: 'in'}).toArray()[0]),
            },
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.ADD_EDGE,
                actionData: this.newEdgeRawData(3, left, node),
            },
            {
                element: node,
                actionType: OgmaAnimationActionType.SET_DATA,
                actionData: {path: 'index', oldData: node.getData('index'), newData: 1},
            }
        );

        this.animationSteps.push({actions});
    }

    private leftRightRotation(x: number): void {
        const node = this.graphVisualizerComponent.getNodeByText(x.toString())!;
        const left = this.nodeOnTheLeftOf(node);
        if (!left) return;

        const leftRight = this.nodeOnTheRightOf(left);
        if (!leftRight) {
            this.rightRotation(x);
            return;
        }

        // left rotate left
        const leftRotateLeftAction = [];
        const edgeFromNodeToLeft = left.getAdjacentEdges({direction: 'in'}).toArray()[0];
        let edgeFromNodeToLeftRight;
        if (edgeFromNodeToLeft) {
            edgeFromNodeToLeftRight = this.newEdgeRawData(1, edgeFromNodeToLeft.getSource(), leftRight);

            leftRotateLeftAction.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(edgeFromNodeToLeft),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: edgeFromNodeToLeftRight,
                },
                {
                    element: leftRight,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {
                        path: 'index',
                        oldData: 1,
                        newData: 0,
                    },
                }
            );
        }

        const leftRightLeft = this.nodeOnTheLeftOf(leftRight);
        if (leftRightLeft) {
            leftRotateLeftAction.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(leftRightLeft.getAdjacentEdges({direction: 'in'}).toArray()[0]),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(2, left, leftRightLeft),
                },
                {
                    element: leftRightLeft,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {
                        path: 'index',
                        oldData: 0,
                        newData: 1,
                    },
                }
            );
        }

        leftRotateLeftAction.push(
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.REMOVE_EDGE,
                actionData: this.edgeRawData(leftRight.getAdjacentEdges({direction: 'in'}).toArray()[0]),
            },
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.ADD_EDGE,
                actionData: this.newEdgeRawData(3, leftRight, left),
            },
            {
                element: left,
                actionType: OgmaAnimationActionType.SET_DATA,
                actionData: {
                    path: 'index',
                    oldData: 0,
                    newData: 0,
                },
            }
        );

        this.animationSteps.push({actions: leftRotateLeftAction});

        // node rotate right
        const nodeRotateRightActions = [];
        const edgeFromParentToNode = node.getAdjacentEdges({direction: 'in'}).toArray()[0];
        if (edgeFromParentToNode) {
            nodeRotateRightActions.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(edgeFromParentToNode),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(4, edgeFromParentToNode.getSource(), leftRight),
                }
            );
        }

        const leftRightRight = this.nodeOnTheRightOf(leftRight);
        if (leftRightRight) {
            nodeRotateRightActions.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(leftRightRight.getAdjacentEdges({direction: 'in'}).toArray()[0]),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(5, node, leftRightRight),
                },
                {
                    element: leftRightRight,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {path: 'index', oldData: 1, newData: 0},
                }
            );
        }

        if (edgeFromNodeToLeftRight) {
            nodeRotateRightActions.push({
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.REMOVE_EDGE,
                actionData: edgeFromNodeToLeftRight,
            });
        }

        nodeRotateRightActions.push(
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.ADD_EDGE,
                actionData: this.newEdgeRawData(6, leftRight, node),
            },
            {
                element: node,
                actionType: OgmaAnimationActionType.SET_DATA,
                actionData: {path: 'index', oldData: 0, newData: 1},
            }
        );

        this.animationSteps.push({actions: nodeRotateRightActions});
    }

    private rightLeftRotation(x: number): void {
        const node = this.graphVisualizerComponent.getNodeByText(x.toString())!;
        const right = this.nodeOnTheRightOf(node);
        if (!right) return;

        const rightLeft = this.nodeOnTheLeftOf(right);
        if (!rightLeft) {
            this.leftRotation(x);
            return;
        }

        // right rotate right
        const rightRotateRightAction = [];
        const edgeFromNodeToRight = right.getAdjacentEdges({direction: 'in'}).toArray()[0];
        let edgeFromNodeToRightLeft;
        if (edgeFromNodeToRight) {
            edgeFromNodeToRightLeft = this.newEdgeRawData(1, edgeFromNodeToRight.getSource(), rightLeft);

            rightRotateRightAction.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(edgeFromNodeToRight),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: edgeFromNodeToRightLeft,
                },
                {
                    element: rightLeft,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {
                        path: 'index',
                        oldData: 0,
                        newData: 1,
                    },
                }
            );
        }

        const rightLeftRight = this.nodeOnTheRightOf(rightLeft);
        if (rightLeftRight) {
            rightRotateRightAction.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(rightLeftRight.getAdjacentEdges({direction: 'in'}).toArray()[0]),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(2, right, rightLeftRight),
                },
                {
                    element: rightLeftRight,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {
                        path: 'index',
                        oldData: 1,
                        newData: 0,
                    },
                }
            );
        }

        rightRotateRightAction.push(
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.REMOVE_EDGE,
                actionData: this.edgeRawData(rightLeft.getAdjacentEdges({direction: 'in'}).toArray()[0]),
            },
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.ADD_EDGE,
                actionData: this.newEdgeRawData(3, rightLeft, right),
            },
            {
                element: right,
                actionType: OgmaAnimationActionType.SET_DATA,
                actionData: {
                    path: 'index',
                    oldData: 1,
                    newData: 1,
                },
            }
        );

        this.animationSteps.push({actions: rightRotateRightAction});

        // node rotate left
        const nodeRotateLeftActions = [];
        const edgeFromParentToNode = node.getAdjacentEdges({direction: 'in'}).toArray()[0];
        if (edgeFromParentToNode) {
            nodeRotateLeftActions.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(edgeFromParentToNode),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(4, edgeFromParentToNode.getSource(), rightLeft),
                }
            );
        }

        const rightLeftLeft = this.nodeOnTheLeftOf(rightLeft);
        if (rightLeftLeft) {
            nodeRotateLeftActions.push(
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.REMOVE_EDGE,
                    actionData: this.edgeRawData(rightLeftLeft.getAdjacentEdges({direction: 'in'}).toArray()[0]),
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: this.newEdgeRawData(5, node, rightLeftLeft),
                },
                {
                    element: rightLeftLeft,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {path: 'index', oldData: 0, newData: 1},
                }
            );
        }

        if (edgeFromNodeToRightLeft) {
            nodeRotateLeftActions.push({
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.REMOVE_EDGE,
                actionData: edgeFromNodeToRightLeft,
            });
        }

        nodeRotateLeftActions.push(
            {
                element: this.ogmaService.FAKE_ELEMENT,
                actionType: OgmaAnimationActionType.ADD_EDGE,
                actionData: this.newEdgeRawData(6, rightLeft, node),
            },
            {
                element: node,
                actionType: OgmaAnimationActionType.SET_DATA,
                actionData: {path: 'index', oldData: 1, newData: 0},
            }
        );

        this.animationSteps.push({actions: nodeRotateLeftActions});
    }

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
