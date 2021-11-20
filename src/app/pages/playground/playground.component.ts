import {Component} from '@angular/core';

@Component({
    selector: 'app-playground',
    templateUrl: './playground.component.html',
    styleUrls: ['./playground.component.scss'],
})
export class PlaygroundComponent {
    public lines: string[] = [
        '$x^n = x^{n-2}$',
        '$\\Rightarrow x^n - x^{n-2} = 0$',
        '$\\Rightarrow x^{n-2}(x^2-1) = 0$',
        '$\\Rightarrow x_1 = 1 \\ , x_2 = -1$',
    ].filter((line) => !!line.trim());
}
