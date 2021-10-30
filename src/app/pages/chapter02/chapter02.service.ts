import {Injectable} from '@angular/core';
import {Chapter02Example} from '../../models/chapter02-example';
import {Chapter02Problem} from '../../models/chapter02-problem';
import {TextMode} from '../../models/text';

@Injectable({
    providedIn: 'root',
})
export class Chapter02Service {
    public readonly EXAMPLES: Chapter02Example[] = [
        {
            codeUrl: 'assets/data/chapter02/src/Example1.java',
            tableSolution: {
                gridTemplateColumns: 'repeat(2, 1fr)',
                headers: ['i', 'count'],
                rows: [['$1$', '$1$'], ['$2$', '$1$'], ['$3$', '$1$'], ['...'], ['$n$', '$1$']],
                lines: ['$Total Count = n$'],
            },
            sigmaSolution: {
                lines: [`$\\sum\\limits^{n}_{i=1}{1} = n$`],
            },
            complexity: 'n',
        },
        {
            codeUrl: 'assets/data/chapter02/src/Example2.java',
            tableSolution: {
                gridTemplateColumns: 'repeat(3, 1fr)',
                headers: ['i', 'j', 'count'],
                rows: [
                    ['$1$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$2$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$3$', '$1, 2, 3, ..., n$', '$n$'],
                    ['...'],
                    ['$n$', '$1, 2, 3, ..., n$', '$n$'],
                ],
                lines: ['$Total Count = n + n + n + ... + n = n.n = n^2$'],
            },
            sigmaSolution: {
                lines: [
                    `$\\sum\\limits^{n}_{i=1}{\\sum\\limits^{n}_{j=1}{1}}
                     = \\sum\\limits^{n}_{i=1}{n}
                     = n^2$`,
                ],
            },
            complexity: 'n^2',
        },
        {
            codeUrl: 'assets/data/chapter02/src/Example3.java',
            tableSolution: {
                gridTemplateColumns: 'repeat(3, 1fr)',
                headers: ['i', 'j', 'count'],
                rows: [
                    ['$1$', '$1$', '$1$'],
                    ['$2$', '$1, 2$', '$2$'],
                    ['$3$', '$1, 2, 3$', '$3$'],
                    ['...'],
                    ['$n$', '$1, 2, 3, ..., n$', '$n$'],
                ],
                lines: [
                    '$Total Count = 1 + 2 + 3 + ... + n = {n.(n + 1) \\over 2} = {{1 \\over 2}{n^2}} + {{1 \\over 2}{n}}$',
                ],
            },
            sigmaSolution: {
                lines: [
                    `$\\sum\\limits^{n}_{i=1}{\\sum\\limits^{i}_{j=1}{1}}
                     = \\sum\\limits^{n}_{i=1}{i}
                     = {n.(n + 1) \\over 2}
                     = {{1 \\over 2}{n^2}} + {{1 \\over 2}{n}}$`,
                ],
            },
            complexity: 'n^2',
        },
        {
            codeUrl: 'assets/data/chapter02/src/Example4.java',
            tableSolution: {
                gridTemplateColumns: 'repeat(3, 1fr)',
                headers: ['i', 'i', 'count'],
                rows: [
                    ['$1$', '$2^0$', '$1$'],
                    ['$2$', '$2^1$', '$1$'],
                    ['$4$', '$2^2$', '$1$'],
                    ['$8$', '$2^3$', '$1$'],
                    ['$16$', '$2^4$', '$1$'],
                    ['...'],
                    ['$n$', '$2^k$', '$1$'],
                ],
                lines: [
                    '$n = 2^k => \\log_2{n} = k$',
                    '$Total Count = 1 + 1 + 1 + 1 + 1 + ... + 1 = k + 1 = \\log_2{n} + 1$',
                ],
            },
            sigmaSolution: {
                lines: [`$N/A$`],
            },
            complexity: '\\log{n}',
        },
        {
            codeUrl: 'assets/data/chapter02/src/Example5.java',
            tableSolution: {
                gridTemplateColumns: 'repeat(4, 1fr)',
                headers: ['i', 'i', 'i', 'count'],
                rows: [
                    ['$2$', '$2^1$', '$2^{2^0}$', '$1$'],
                    ['$4$', '$2^2$', '$2^{2^1}$', '$1$'],
                    ['$16$', '$2^4$', '$2^{2^2}$', '$1$'],
                    ['256', '$2^8$', '$2^{2^3}$', '$1$'],
                    ['$65536$', '$2^{16}$', '$2^{2^4}$', '$1$'],
                    ['...'],
                    ['$n$', '$2^{2^k}$', '$2^{2^k}$', '$1$'],
                ],
                lines: [
                    '$n = 2^{2^k} => \\log_2{n} = 2^k => \\log_2{\\log_2{n}} = k$',
                    '$Total Count = 1 + 1 + 1 + 1 + 1 + ... + 1 = k + 1 = \\log_2{\\log_2{n}} + 1$',
                ],
            },
            sigmaSolution: {
                lines: [`$N/A$`],
            },
            complexity: '\\log{\\log{n}}',
        },
        {
            codeUrl: 'assets/data/chapter02/src/Example6.java',
            tableSolution: {
                gridTemplateColumns: 'repeat(4, 1fr)',
                headers: ['i', 'j', 'k', 'count'],
                rows: [
                    ['$1$', '$1$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$1$', '$2$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$1$', '$3$', '$1, 2, 3, ..., n$', '$n$'],
                    ['...'],
                    ['$1$', '$n$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$2$', '$1$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$2$', '$2$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$2$', '$3$', '$1, 2, 3, ..., n$', '$n$'],
                    ['...'],
                    ['$2$', '$n$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$3$', '$1$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$3$', '$2$', '$1, 2, 3, ..., n$', '$n$'],
                    ['$3$', '$3$', '$1, 2, 3, ..., n$', '$n$'],
                    ['...'],
                    ['$n$', '$n$', '$1, 2, 3, ..., n$', '$n$'],
                ],
                lines: ['$Total Count = n.n.n = n^3$'],
            },
            sigmaSolution: {
                lines: [
                    `$\\sum\\limits^{n}_{i=1}{\\sum\\limits^{n}_{j=1}{\\sum\\limits^{n}_{k=1}{1}}}
                     = \\sum\\limits^{n}_{i=1}{\\sum\\limits^{n}_{j=1}{n}}
                     = \\sum\\limits^{n}_{i=1}{n^2}
                     = n^3$`,
                ],
            },
            complexity: 'n^3',
        },
    ];

    public readonly PROBLEMS: Chapter02Problem[] = [
        {
            solution: [
                {
                    lines: [
                        {
                            isRtl: false,
                            codeUrl: 'assets/data/chapter02/src/Problem1Section1.java',
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content:
                                        'از آنجایی که برای جمع‌زدن اعضا، باید هر دو آرایه را به طور کامل پیمایش کنیم، این الگوریتم وابسته به حالت ورودی نیست.',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                    ],
                },
                {
                    lines: [
                        {
                            isRtl: false,
                            codeUrl: 'assets/data/chapter02/src/Problem1Section2.java',
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content:
                                        'از آنجایی که تمامِ اعضای هر کدام از آرایه‌ها باید بررسی شوند، این الگوریتم وابسته به حالت ورودی نیست.',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                    ],
                },
                {
                    lines: [
                        {
                            isRtl: false,
                            codeUrl: 'assets/data/chapter02/src/Problem1Section3.java',
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content:
                                        'با توجه به موقعیت عدد مورد نظر، در بهترین حالت با یک مقایسه و در بدترین حالت با ',
                                    mode: TextMode.NORMAL,
                                },
                                {
                                    content: '$n$',
                                    mode: TextMode.LATEX,
                                },
                                {
                                    content:
                                        ' به جواب مورد نظر می‌رسیم. بنابراین این الگوریتم وابسته به حالت ورودی می‌باشد.',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];
}
