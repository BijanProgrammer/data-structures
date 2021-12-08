import {Component} from '@angular/core';
import {RandomGraphGenerator, RandomTreeGenerator, SimpleDfsGraphGenerator} from '../../models/graph-generator';
import {ClassName, Edge, Layout, Node, OgmaAnimationStep} from '../../models/ogma';
import {OgmaService} from '../../services/ogma.service';

@Component({
    selector: 'app-dfs',
    templateUrl: './dfs.component.html',
    styleUrls: ['./dfs.component.scss'],
})
export class DfsComponent {
    public Layout = Layout;

    public simpleDfsGraphGenerator: SimpleDfsGraphGenerator = new SimpleDfsGraphGenerator();
    public randomGraphGenerator: RandomGraphGenerator = new RandomGraphGenerator();
    public randomTreeGenerator: RandomTreeGenerator = new RandomTreeGenerator();

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(payload: {
        animationSteps: OgmaAnimationStep[];
        startNode: Node;
        targetNode: Node;
    }): void {
        this.dfs(payload.animationSteps, payload.startNode, payload.targetNode);
    }

    private dfs(animationSteps: OgmaAnimationStep[], currentNode: Node, targetNode: Node): boolean {
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

            this.ogmaService.generateAddClassNameStep(animationSteps, edge);
            edge.setData('visited', true);

            const found = this.dfs(animationSteps, nextNode, targetNode);
            if (found) return true;

            this.ogmaService.generateRemovePathClassNameStep(animationSteps, edge);
        }

        this.ogmaService.generateRemovePathClassNameStep(animationSteps, currentNode);

        return false;
    }
}
