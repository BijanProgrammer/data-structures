import {Component} from '@angular/core';
import {RandomGraphGenerator, SimpleDfsGraphGenerator} from '../../models/graph-generator';

@Component({
    selector: 'app-dfs',
    templateUrl: './dfs.component.html',
    styleUrls: ['./dfs.component.scss'],
})
export class DfsComponent {
    public simpleDfsGraphGenerator: SimpleDfsGraphGenerator = new SimpleDfsGraphGenerator();
    public randomGraphGenerator: RandomGraphGenerator = new RandomGraphGenerator();
}
