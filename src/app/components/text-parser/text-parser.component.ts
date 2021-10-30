import {Component, Input} from '@angular/core';
import {TextBlock} from '../../models/text';

@Component({
    selector: 'app-text-parser',
    templateUrl: './text-parser.component.html',
    styleUrls: ['./text-parser.component.scss'],
})
export class TextParserComponent {
    @Input() public textBlocks!: TextBlock[];
}
