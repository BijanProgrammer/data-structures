import {Injectable} from '@angular/core';
import {Chapter02Example} from '../../models/chapter02-example';
import {Chapter02Problem} from '../../models/chapter02-problem';
import {generateLatexLine, TextMode} from '../../models/text';

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
        {
            solution: [
                {
                    lines: [
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content:
                                        '$\\lim_{n \\to \\infty} {\\sqrt{n} \\over \\log{n}} = \\lim_{n \\to \\infty} {\\infty \\over \\infty}$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'از قاعدۀ HOP استفاده میکنیم (از صورت و مخرج کسر مشتق می‌گیریم):',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content:
                                        '= $\\lim_{n \\to \\infty} {{1 \\over 2\\sqrt{n}} \\over {1 \\over n \\times \\ln{10}}} = \\lim_{n \\to \\infty} {{n} \\over {\\sqrt{n}}} = \\lim_{n \\to \\infty} {\\sqrt{n}} = \\infty$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'بنابراین می‌توان نتیجه گرفت که ...',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content: '$\\log{n} \\in O(\\sqrt{n})$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            solution: [
                {
                    lines: [
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content:
                                        '$' +
                                        [
                                            '\\lim_{n \\to \\infty} {n! \\over n^3}',
                                            '= \\lim_{n \\to \\infty} {{n(n-1)(n-2) \\times (n-3)!} \\over n^3}',
                                            '= \\lim_{n \\to \\infty} {{(n^3 - 3n^2 + 2n) \\over n^3} (n-3)!}',
                                            '= \\lim_{n \\to \\infty} {(n-3)!}',
                                            '= \\infty',
                                        ].join(' ') +
                                        '$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'بنابراین می‌توان نتیجه گرفت که ...',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content: '$n^3 \\in O(n!)$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            solution: [
                {
                    lines: [
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content:
                                        'تمام توابعی که هیچ وابستگی‌ای به n نداشته باشند، تابع ثابت محسوب می‌شوند و از O(1) هستند.',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            solution: [
                {
                    lines: [
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content: 'N/A',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            solution: [
                {
                    lines: [
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content:
                                        '$' +
                                        ['S(n) = 1^2 + 2^2 + 3^2 + ... + (n-1)^2 + n^2', '= S(n-1) + n^2'].join(' ') +
                                        '$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content:
                                        'معادلۀ بالا یک معادلۀ خطی ناهمگن است که جواب بخش همگن آن به شکل زیر بدست می‌آید:',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content:
                                        '$' +
                                        [
                                            'x^n = x^{n-1}',
                                            '\\Rightarrow x^n - x^{n-1} = 0',
                                            '\\Rightarrow x^{n-1}(x - 1) = 0',
                                            '\\Rightarrow x = 1',
                                        ].join(' ') +
                                        '$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'همچنین جواب بخش ناهمگن آن به شکل زیر بدست می‌آید:',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content:
                                        '$' + ['b = 1, p(n) = n^2, d = 2', '\\Rightarrow (x-1)^3 = 0'].join(' ') + '$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'بنابراین معادلۀ نهایی به شکل زیر خواهد بود:',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content: '$' + ['S(n) = c_1 + c_2 n + c_3 n^2 + c_4 n^3 + c_5 n^4'].join(' ') + '$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'در نهایت با اعمال شرایط اولیه، ثابت‌ها را بدست می‌آوریم.',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            solution: [
                {
                    lines: [
                        generateLatexLine('$T(0) = 0$'),
                        generateLatexLine('$T(n) = 2T(n-2) + 1$'),
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content:
                                        'معادلۀ بالا یک معادلۀ خطی ناهمگن است که جواب بخش همگن آن به شکل زیر بدست می‌آید:',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        {
                            isRtl: false,
                            parts: [
                                {
                                    content:
                                        '$' +
                                        [
                                            'x^n = 2x^{n-2}',
                                            '\\Rightarrow x^n - 2x^{n-2} = 0',
                                            '\\Rightarrow x^{n-2}(x^2-2) = 0',
                                            '\\Rightarrow x_1 = +\\sqrt{2} \\ , x_2 = -\\sqrt{2}',
                                        ].join(' ') +
                                        '$',
                                    mode: TextMode.LATEX,
                                },
                            ],
                        },
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'همچنین جواب بخش ناهمگن آن به شکل زیر بدست می‌آید:',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        generateLatexLine('$b = 1, p(n) = 1, d = 0 \\Rightarrow x = 1$'),
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'بنابراین معادلۀ نهایی به شکل زیر خواهد بود:',
                                    mode: TextMode.NORMAL,
                                },
                            ],
                        },
                        generateLatexLine('$T(n) = c_1 + c_2 (\\sqrt{2})^n + c_3 (-\\sqrt{2})^n$'),
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content: 'در نهایت با اعمال شرایط اولیه، ثابت‌ها را بدست می‌آوریم.',
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
