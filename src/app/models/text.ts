export enum TextMode {
    NORMAL = 'normal',
    LATEX = 'latex',
}

export enum TextAddon {
    BUBBLE,
    UNDERLINE,
}

export interface TextBlock {
    lines: Line[];
}

export interface Line {
    isRtl: boolean;
    codeUrl?: string;
    parts?: Part[];
}

export interface Part {
    content: string;
    mode: TextMode;
    addons?: TextAddon[];
    style?: {[klass: string]: any};
}

export function generateLatexLine(content: string): Line {
    return {
        isRtl: false,
        parts: [
            {
                content,
                mode: TextMode.LATEX,
            },
        ],
    };
}
