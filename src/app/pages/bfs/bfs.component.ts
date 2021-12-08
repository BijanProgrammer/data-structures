import {Component} from '@angular/core';
import {RandomGraphGenerator, RandomTreeGenerator, SimpleBfsGraphGenerator} from '../../models/graph-generator';
import {ClassName, Edge, Layout, Node, OgmaAnimationStep} from '../../models/ogma';
import {OgmaService} from '../../services/ogma.service';
import {Cell, LinearQueue} from '../../models/queue';

@Component({
    selector: 'app-bfs',
    templateUrl: './bfs.component.html',
    styleUrls: ['./bfs.component.scss'],
})
export class BfsComponent {
    public Layout = Layout;

    public simpleBfsGraphGenerator: SimpleBfsGraphGenerator = new SimpleBfsGraphGenerator();
    public randomGraphGenerator: RandomGraphGenerator = new RandomGraphGenerator();
    public randomTreeGenerator: RandomTreeGenerator = new RandomTreeGenerator();

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(payload: {
        animationSteps: OgmaAnimationStep[];
        startNode: Node;
        targetNode: Node;
    }): void {
        this.bfs(payload.animationSteps, payload.startNode, payload.targetNode);
    }

    private bfs(animationSteps: OgmaAnimationStep[], startNode: Node, targetNode: Node): boolean {
        const queue = new LinearQueue(50, [new Cell(startNode)]);

        while (!queue.isEmpty()) {
            const currentNode = queue.dequeue().value as Node;
            this.ogmaService.generateAddClassNameStep(animationSteps, currentNode);
            currentNode.setData('visited', true);

            if (currentNode === targetNode) return true;

            const edges: Edge[] = currentNode.getAdjacentEdges({direction: 'out'}).toArray();
            for (const edge of edges) {
                if (edge.getData('visited')) continue;

                const nextNode = edge.getTarget();
                if (nextNode.getData('visited')) {
                    this.ogmaService.generateAddClassNameStep(animationSteps, edge, ClassName.DISABLED);
                    continue;
                }

                const indexInQueue = queue.cells.findIndex((x) => {
                    if (!x.value.getId || typeof x.value.getId !== 'function') return false;
                    return x.value.getId() === nextNode.getId();
                });

                if (indexInQueue === -1) queue.enqueue(new Cell(nextNode));
            }

            this.ogmaService.generateRemovePathClassNameStep(animationSteps, currentNode);
        }

        return false;
    }
}
