import {Injectable} from '@angular/core';
import {Chapter02Example} from '../../models/chapter02-example';
import {Chapter02Problem} from '../../models/chapter02-problem';
import {generateLatexLine, generateNormalLine, TextMode} from '../../models/text';

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
        Chapter02Service.generateNaProblem(),
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
        {
            solution: [
                {
                    lines: [
                        generateLatexLine('$T(0) = 0$'),
                        generateLatexLine('$T(n) = T(n-2) + 1$'),
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
                                            'x^n = x^{n-2}',
                                            '\\Rightarrow x^n - x^{n-2} = 0',
                                            '\\Rightarrow x^{n-2}(x^2-1) = 0',
                                            '\\Rightarrow x_1 = 1 \\ , x_2 = -1',
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
                        generateLatexLine('$T(n) = c_1 + c_2 n + c_3 (-1)^n$'),
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
                        {
                            isRtl: true,
                            parts: [
                                {
                                    content:
                                        'مرتبه پیچیدگی سوال 7 از اردر نمایی است، در صورتی که مرتبه پیچیدگی سوال 8 از اردر خطی است. بنابراین به وضوح مشخص است که الگوریتم سوال 8 به مراتب بهینه‌تر از الگوریتم سوال 7 می‌باشد.',
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
                        generateLatexLine('$T(1) = 0$'),
                        generateLatexLine('$T(2) = 0$'),
                        generateLatexLine('$T(n) = T(n-2) + 2T(n-4) + 2$'),
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
                                            'x^n = x^{n-2} + 2x^{n-4}',
                                            '\\Rightarrow x^n - x^{n-2} - 2x^{n-4} = 0',
                                            '\\Rightarrow x^{n-4}(x^4 - x^2 - 2) = 0',
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
                        generateLatexLine('$b = 1, p(n) = 2, d = 0 \\Rightarrow x = 1$'),
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
        {
            solution: [
                {
                    lines: [
                        generateLatexLine('$T(2) = 1$'),
                        generateLatexLine('$T(n) = {T(\\sqrt{n}) \\over \\sqrt{n}} + {\\log_2{n} \\over n}$'),
                    ],
                },
                {
                    lines: [
                        generateNormalLine('ابتدا طرفین معادله را در n ضرب می‌کنیم:'),
                        generateLatexLine('$n.T(n) = {\\sqrt{n}.T(\\sqrt{n})} + {\\log_2{n}}$'),
                        generateNormalLine('با توجه به عبارت زیر، تابع T را به تابع t تبدیل می‌کنیم:'),
                        generateLatexLine('$t(n) = n.T(n)$'),
                        generateLatexLine('$t(n) = t(\\sqrt{n}) + \\log_2{n}$'),
                    ],
                },
                {
                    lines: [
                        generateNormalLine('حال با توجه به عبارت زیر، n را جایگزین می‌کنیم:'),
                        generateLatexLine('$n = 2^{2^k}$'),
                        generateLatexLine('$t(2^{2^k}) = t(2^{2^{k-1}}) + 2^k$'),
                    ],
                },
                {
                    lines: [
                        generateNormalLine('با توجه به عبارت زیر، تابع t را به تابع f تبدیل می‌کنیم:'),
                        generateLatexLine('$f(k) = t(2^{2^k})$'),
                        generateLatexLine('$f(k) = f(k-1) + 2^k$'),
                        generateNormalLine('معادلۀ بالا یک معادلۀ خطی ناهمگن است که جواب آن به شکل زیر بدست می‌آید:'),
                        generateLatexLine('$x_1 = 1 \\ , x_2 = 2$'),
                        generateNormalLine('بنابراین معادلۀ نهایی به شکل زیر خواهد بود:'),
                        generateLatexLine('$f(k) = c_1 2^k + c_2$'),
                        generateNormalLine('با اعمال شرایط اولیه، ثابت‌ها را بدست می‌آوریم:'),
                        generateLatexLine('$c_1 = 2 \\ , c_2 = -1$'),
                        generateLatexLine('$\\Rightarrow f(k) = 2^{k+1} - 1$'),
                    ],
                },
                {
                    lines: [
                        generateNormalLine('حال باید جواب معادله را بر حسب n بدست آوریم:'),
                        generateLatexLine('$n = 2^{2^k} \\Rightarrow k = \\log_2{log_2{n}}$'),
                        generateLatexLine(
                            '$f(k) = t(2^{2^k}) = 2 \\times 2^{\\log_2{log_2{n}}} - 1 = 2 \\times (\\log_2{n})^{log_2{2}} - 1$'
                        ),
                        generateLatexLine('$\\Rightarrow t(n) = t(2^{2^k}) = 2\\log_2{n} - 1$'),
                        generateLatexLine('$\\Rightarrow T(n) = {t(n) \\over n} = {2\\log_2{n} - 1 \\over n}$'),
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
                            codeUrl: 'assets/data/chapter02/src/Problem12.java',
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
                            codeUrl: 'assets/data/chapter02/src/Problem13.java',
                        },
                    ],
                },
            ],
        },
        Chapter02Service.generateNaProblem(),
        {
            solution: [
                {
                    lines: [
                        generateLatexLine(
                            '$' +
                                [
                                    '\\log{(n!)}',
                                    '= \\log{(n \\times (n-1) \\times (n-2) \\times ... \\times 2 \\times 1)}',
                                    '= \\log{(n)} + \\log{(n-1)} + \\log{(n-2)} + ... + \\log{(2)} + \\log{(1)}',
                                    '= \\sum\\limits^{n}_{i=1}{\\log{i}}',
                                ].join(' ') +
                                '$'
                        ),
                    ],
                },
                {
                    lines: [
                        generateLatexLine(
                            '$' +
                                [
                                    '\\sum\\limits^{n}_{i=1}{\\log{i}}',
                                    '\\leq \\sum\\limits^{n}_{i=1}{\\log{n}}',
                                    '= n\\log{n}',
                                ].join(' ') +
                                '$'
                        ),
                        generateLatexLine('$\\Rightarrow \\log{(n!)} \\in O(n\\log{n})$'),
                    ],
                },
                {
                    lines: [
                        generateLatexLine(
                            '$' +
                                [
                                    '\\sum\\limits^{n}_{i=1}{\\log{i}}',
                                    '\\geq \\sum\\limits^{n}_{i={n \\over 2}+1}{\\log{({n \\over 2}+1)}}',
                                    '= {n \\over 2} \\log{({n \\over 2}+1)}',
                                    '\\geq {n \\over 2} \\log{({n \\over 2})}',
                                    '\\geq {n \\over 2} \\log{(\\sqrt{n})}',
                                    '= {n \\over 2} \\log{(n^{1 \\over 2})}',
                                    '= {1 \\over 4} n\\log{n}',
                                ].join(' ') +
                                '$'
                        ),
                        generateLatexLine('$\\Rightarrow \\log{(n!)} \\in \\Omega(n\\log{n})$'),
                    ],
                },
                {
                    lines: [generateLatexLine('$\\Rightarrow \\log{(n!)} \\in \\Theta(n\\log{n})$')],
                },
            ],
        },
    ];

    private static generateNaProblem(): Chapter02Problem {
        return {
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
        };
    }
}
