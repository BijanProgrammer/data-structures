import {Component} from '@angular/core';
import {GraphGenerator, HeapSortGenerator} from '../../models/graph-generator';
import {ClassName, Edge, Layout, Node, OgmaAnimationActionType, OgmaAnimationStep} from '../../models/ogma';
import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';
import {OgmaService} from '../../services/ogma.service';

@Component({
    selector: 'app-heap-sort',
    templateUrl: './heap-sort.component.html',
    styleUrls: ['./heap-sort.component.scss'],
})
export class HeapSortComponent {
    public Layout = Layout;

    public setLayoutEnabled: boolean = true;
    public graphs: {name: string; generator: GraphGenerator}[] = [
        {name: 'small', generator: new HeapSortGenerator()},
        {name: 'large', generator: new HeapSortGenerator(HeapSortComponent.generateRandomArray())},
    ];
    public rootId: number = 1;

    private animationSteps!: OgmaAnimationStep[];
    private graphVisualizerComponent!: GraphVisualizerComponent;

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(
        payload: {
            animationSteps: OgmaAnimationStep[];
            graphVisualizerComponent: GraphVisualizerComponent;
        },
        generator: GraphGenerator
    ): void {
        this.animationSteps = payload.animationSteps;
        this.graphVisualizerComponent = payload.graphVisualizerComponent;

        this.setLayoutEnabled = false;
        this.heapSort();
        this.graphVisualizerComponent.setGraph(generator.generateGraph()).then(() => {
            this.setLayoutEnabled = true;
        });
    }

    private heapSort(): void {
        const nodes: Node[] = this.graphVisualizerComponent.getNodes().toArray();
        const visited: Node[] = [];

        for (let i = 0; i < nodes.length; i++) {
            const rootText = nodes[0].getAttribute('text');
            const room = this.makeRoom(null, nodes[0], visited);

            const lastNode = nodes[nodes.length - 1 - visited.length];

            if (room !== lastNode) {
                const lastNodeText = lastNode.getAttribute('text');
                this.setText(lastNode, '');
                this.setText(room, lastNodeText);

                let roomIndex = nodes.findIndex((x) => x === room);
                while (i > 0) {
                    const parentIndex = Math.floor((roomIndex - 1) / 2);

                    const parentText = nodes[parentIndex].getAttribute('text');
                    const currentText = nodes[roomIndex].getAttribute('text');

                    if (+currentText <= +parentText) break;

                    const temp = parentText;
                    this.setText(nodes[parentIndex], '');
                    this.setText(nodes[parentIndex], currentText);
                    this.setText(nodes[roomIndex], '');
                    this.setText(nodes[roomIndex], temp);

                    roomIndex = parentIndex;
                }
            }

            this.setText(lastNode, rootText);

            visited.push(lastNode);
            this.animationSteps.push({
                actions: [
                    {
                        element: lastNode,
                        actionType: OgmaAnimationActionType.ADD_CLASS,
                        actionData: {className: ClassName.PATH},
                    },
                ],
            });
        }
    }

    private makeRoom(parent: Node | null, node: Node, visited: Node[]): Node {
        const text = node.getAttribute('text');
        this.setText(node, '');
        if (parent) this.setText(parent, text);

        const {left, right} = this.leftAndRight(node, visited);

        if (!left && !right) return node;

        if (!left) return this.makeRoom(node, right!, visited);
        if (!right) return this.makeRoom(node, left, visited);

        if (+left.getAttribute('text') > +right.getAttribute('text')) return this.makeRoom(node, left, visited);
        return this.makeRoom(node, right, visited);
    }

    private leftAndRight(node: Node, visited: Node[]): {left: Node | undefined; right: Node | undefined} {
        let left;
        let right;

        const [first, second]: Edge[] = node.getAdjacentEdges({direction: 'out'}).toArray();

        const firstIndex = first?.getTarget().getData('index');
        const secondIndex = second?.getTarget().getData('index');

        if (firstIndex === 0) left = first.getTarget();
        if (secondIndex === 0) left = second.getTarget();

        if (firstIndex === 1) right = first.getTarget();
        if (secondIndex === 1) right = second.getTarget();

        if (left && visited.includes(left)) left = undefined;
        if (right && visited.includes(right)) right = undefined;

        return {left, right};
    }

    private setText(node: Node, text: any): void {
        const oldText = node.getAttribute('text');
        node.setAttribute('text', text).then();

        this.animationSteps.push({
            actions: [
                {
                    element: node,
                    actionType: OgmaAnimationActionType.SET_ATTRIBUTE,
                    actionData: {
                        path: 'text',
                        oldAttribute: oldText,
                        newAttribute: text,
                    },
                },
            ],
        });
    }

    private static generateRandomArray(count: number = 23): number[] {
        const numbers: number[] = Array(count)
            .fill(0)
            .map((_, i) => i + 1);

        numbers.sort(() => 0.5 - Math.random());

        return numbers;
    }
}
