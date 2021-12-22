import {Component} from '@angular/core';
import {HuffmanGenerator} from '../../models/graph-generator';
import {ClassName, Layout, Node, OgmaAnimationActionType, OgmaAnimationStep} from '../../models/ogma';
import {GraphVisualizerComponent} from '../../components/graph-visualizer/graph-visualizer.component';
import {OgmaService} from '../../services/ogma.service';

@Component({
    selector: 'app-huffman',
    templateUrl: './huffman.component.html',
    styleUrls: ['./huffman.component.scss'],
})
export class HuffmanComponent {
    public Layout = Layout;

    public randomTreeGenerator = new HuffmanGenerator();
    public methods: string[] = ['huffman'];
    public setLayoutEnabled: boolean = false;
    public rootId: number = 1;

    private animationSteps!: OgmaAnimationStep[];
    private graphVisualizerComponent!: GraphVisualizerComponent;

    private queue: Node[] = [];

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
            case 'huffman':
                this.setLayoutEnabled = false;
                this.huffman();
                this.graphVisualizerComponent.setGraph(this.randomTreeGenerator.generateGraph()).then(() => {
                    this.setLayoutEnabled = true;
                });
                break;
        }
    }

    private huffman(): void {
        this.queue = this.graphVisualizerComponent.getNodes().toArray();
        let nodeId = this.queue.length;
        let edgeId = 0;

        while (this.queue.length > 1) {
            const p = this.dequeue();
            const q = this.dequeue();
            this.markDequeuedNodes(p, q);

            const character = p.getData('character') + q.getData('character');
            const count = +p.getData('count') + +q.getData('count');

            nodeId++;
            const node = {
                id: nodeId,
                attributes: {text: `${character}, ${count}`},
                data: {index: nodeId, character, count},
            };

            p.setData('index', 0);
            q.setData('index', 1);
            this.setData(p, q);

            edgeId++;
            const leftEdge = {id: edgeId, source: nodeId, target: p.getId(), attributes: {text: '0'}, data: {}};

            edgeId++;
            const rightEdge = {id: edgeId, source: nodeId, target: q.getId(), attributes: {text: '1'}, data: {}};

            const createdNode = this.graphVisualizerComponent.addNode(node);
            this.addNode(node, nodeId);

            this.graphVisualizerComponent.addEdge(leftEdge);
            this.graphVisualizerComponent.addEdge(rightEdge);
            this.addEdges(leftEdge, rightEdge);

            this.queue.push(createdNode);

            this.unmarkAll(p, q, createdNode);
        }

        this.rootId = this.queue[0].getId();
    }

    private markDequeuedNodes(p: Node, q: Node): void {
        this.animationSteps.push({
            actions: [
                {
                    element: p,
                    actionType: OgmaAnimationActionType.ADD_CLASS,
                    actionData: {className: ClassName.SECONDARY},
                },
                {
                    element: q,
                    actionType: OgmaAnimationActionType.ADD_CLASS,
                    actionData: {className: ClassName.SECONDARY},
                },
            ],
        });
    }

    private unmarkAll(p: Node, q: Node, parent: Node): void {
        this.animationSteps.push({
            actions: [
                {
                    element: p,
                    actionType: OgmaAnimationActionType.REMOVE_CLASS,
                    actionData: {className: ClassName.SECONDARY},
                },
                {
                    element: q,
                    actionType: OgmaAnimationActionType.REMOVE_CLASS,
                    actionData: {className: ClassName.SECONDARY},
                },
                {
                    element: parent,
                    actionType: OgmaAnimationActionType.REMOVE_CLASS,
                    actionData: {className: ClassName.PATH},
                },
            ],
        });
    }

    private setData(p: Node, q: Node): void {
        this.animationSteps.push({
            actions: [
                {
                    element: p,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {path: 'index', oldData: 0, newData: 0},
                },
                {
                    element: q,
                    actionType: OgmaAnimationActionType.SET_DATA,
                    actionData: {path: 'index', oldData: 0, newData: 1},
                },
            ],
        });
    }

    private addNode(node: any, index: number): void {
        const element: Node = this.graphVisualizerComponent.getNode(index);

        this.animationSteps.push({
            actions: [
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_NODE,
                    actionData: node,
                },
                {element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className: ClassName.PATH}},
            ],
        });
    }

    private addEdges(left: any, right: any): void {
        this.animationSteps.push({
            actions: [
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: left,
                },
                {
                    element: this.ogmaService.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_EDGE,
                    actionData: right,
                },
            ],
        });
    }

    private dequeue(): Node {
        let minimumIndex = 0;
        for (let i = 1; i < this.queue.length; i++) {
            if (this.queue[minimumIndex].getData('count') > this.queue[i].getData('count')) {
                minimumIndex = i;
            }
        }

        const node = this.queue[minimumIndex];
        this.queue.splice(minimumIndex, 1);
        return node;
    }
}
