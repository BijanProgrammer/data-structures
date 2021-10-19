import {Component} from '@angular/core';
import {Chapter02Service} from './chapter02.service';

@Component({
    selector: 'app-chapter02',
    templateUrl: './chapter02.component.html',
    styleUrls: ['./chapter02.component.scss'],
})
export class Chapter02Component {
    public constructor(public chapter02Service: Chapter02Service) {}
}
