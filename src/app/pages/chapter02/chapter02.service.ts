import {Injectable} from '@angular/core';
import {Chapter02Example} from '../../models/chapter02-example';

@Injectable({
    providedIn: 'root',
})
export class Chapter02Service {
    public readonly EXAMPLES: Chapter02Example[] = [
        {
            code: 'some code is here ... ',
            tableSolution: {
                gridTemplateColumns: 'repeat(3, 1fr)',
                headers: ['i', 'j', 'count'],
                rows: [
                    ['1', '1, 2, 3, ..., n', 'n'],
                    ['2', '1, 2, 3, ..., n', 'n'],
                    ['3', '1, 2, 3, ..., n', 'n'],
                ],
                lastRow: ['n', '1, 2, 3, ..., n', 'n'],
                lines: ['first line ...', 'second line ...', 'third line ...'],
            },
            sigmaSolution: {
                lines: ['first line ...', 'second line ...', 'third line ...'],
            },
            complexity: 'n',
        },
    ];
}
