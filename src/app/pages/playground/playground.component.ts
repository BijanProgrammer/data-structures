import {Component} from '@angular/core';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent {
    public lines: string[] = `
        Playground
    `
        .split('\n')
        .filter((line) => !!line.trim());
}
