export enum TextMode {
    NORMAL,
    LATEX,
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
