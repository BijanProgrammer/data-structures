import {Component} from '@angular/core';
import {RandomGraphGenerator, SimpleDfsGraphGenerator} from '../../models/graph-generator';
import {ClassName, OgmaAnimationStep} from '../../models/ogma';
import {OgmaService} from '../../services/ogma.service';

@Component({
    selector: 'app-dfs',
    templateUrl: './dfs.component.html',
    styleUrls: ['./dfs.component.scss'],
})
export class DfsComponent {
    public simpleDfsGraphGenerator: SimpleDfsGraphGenerator = new SimpleDfsGraphGenerator();
    public randomGraphGenerator: RandomGraphGenerator = new RandomGraphGenerator();

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(payload: {
        animationSteps: OgmaAnimationStep[];
        startNode: any;
        targetNode: any;
    }): void {
        this.dfs(payload.animationSteps, payload.startNode, payload.targetNode);
    }

    private dfs(animationSteps: OgmaAnimationStep[], currentNode: any, targetNode: any): boolean {
        this.ogmaService.generateAddClassNameStep(animationSteps, currentNode);
        currentNode.setData('visited', true);

        if (currentNode === targetNode) return true;

        const edges: any[] = currentNode.getAdjacentEdges({direction: 'out'}).toArray();
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

            this.ogmaService.generateRemoveClassNameStep(animationSteps, edge);
        }

        this.ogmaService.generateRemoveClassNameStep(animationSteps, currentNode);

        return false;
    }
}
