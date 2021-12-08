import {Component} from '@angular/core';
import {LinearOneWayLinkedListGraphGenerator} from '../../../models/graph-generator';
import {OgmaService} from '../../../services/ogma.service';
import {ClassName, Layout, Node, OgmaAnimationStep} from '../../../models/ogma';

@Component({
    selector: 'app-chapter07-example01',
    templateUrl: './chapter07-example01.component.html',
    styleUrls: ['./chapter07-example01.component.scss'],
})
export class Chapter07Example01Component {
    public Layout = Layout;

    public graphGenerator: LinearOneWayLinkedListGraphGenerator = new LinearOneWayLinkedListGraphGenerator();

    public constructor(public ogmaService: OgmaService) {}

    public generateAnimationSteps(payload: {animationSteps: OgmaAnimationStep[]; head: Node}): void {
        this.solve(payload.animationSteps, payload.head);
    }

    private solve(animationSteps: OgmaAnimationStep[], head: Node): void {
        this.ogmaService.generateRemoveClassNameStep(animationSteps, head, ClassName.PATH);

        this.ogmaService.generateAddClassNameStep(
            animationSteps,
            head.getAdjacentEdges().toArray()[0].getTarget(),
            ClassName.PATH
        );

        // console.log(head.rawData());
        // for (const edge of head.getAdjacentEdges().toArray()) console.log(edge.rawData());

        const edge = head.getAdjacentEdges().toArray()[0];

        const data = {
            id: head.getId(),
            attributes: head.getAttributes(),
            data: head.getData(),
            edge: {
                id: edge.getId(),
                source: edge.getSource(),
                target: edge.getTarget(),
                data: edge.getData(),
            },
        };

        this.ogmaService.generateRemoveElementStep(animationSteps, head, data);
    }
}
