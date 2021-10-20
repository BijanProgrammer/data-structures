import {Injectable} from '@angular/core';
import {Chapter02Example} from '../../models/chapter02-example';

@Injectable({
    providedIn: 'root',
})
export class Chapter02Service {
    public readonly EXAMPLES: Chapter02Example[] = [
        {
            codeUrl: 'assets/data/chapter02/src/Example01.java',
            tableSolution: {
                gridTemplateColumns: 'repeat(3, 1fr)',
                headers: ['i', 'j', 'count'],
                rows: [
                    ['$1$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$2$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$3$', '$1, 2, 3, ..., n$', '$n$'],
                ],
                lastRow: ['$n$', '$1, 2, 3, ..., n$', '$n$'],
                lines: [
                    `$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$`,
                    `$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$`,
                    `$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$`,
                ],
            },
            sigmaSolution: {
                lines: [
                    `$\\sum\\limits^{N}_{n=0}{\\sum\\limits_{m=1}^{(n+1)/2}\\mu |c_n|\\frac{n!}{(2m-1)!\\pi ^{n-2m-2}}|z|^{2m-1}}$`,
                ],
            },
            complexity: 'n',
        },
    ];
}
