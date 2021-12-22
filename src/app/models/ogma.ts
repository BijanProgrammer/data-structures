import {AnimationAction, AnimationStep} from './animator';

export class RawGraph {
    public nodes!: Node[];
    public edges!: Edge[];
}

export class Element<T extends Node | Edge, TList extends NodeList | EdgeList> {
    public isNode!: boolean;
    public isEdge!: boolean;
    public addClass!: (className: string) => Promise<T>;
    public getClassList!: () => [string];
    public getAttributes!: () => any;
    public getData!: (propertyPath?: string | string[]) => any;
    public getId!: () => any;
    public removeClass!: (className: string) => Promise<T>;
    public removeClasses!: (classNames: string[]) => Promise<TList>;
    public setData!: (propertyPath: string | string[], value: any) => T;
}

export class ElementList<T> {
    public size!: number;

    public setData!: (propertyPath: string | string[], value: any) => T;
    public setSelected!: (active: boolean | boolean[]) => void;
    public toArray!: () => T[];
}

export class Node extends Element<Node, NodeList> {
    private id!: any;
    private attributes!: any;
    private data!: any;
    private x!: any;
    private y!: any;

    public constructor({id, attributes, data, x, y}: {id: any; attributes?: any; data?: any; x?: number; y?: number}) {
        super();

        this.id = id;
        this.attributes = attributes;
        this.data = data;
        this.x = x;
        this.y = y;
    }

    public getAdjacentEdges!: (options?: AdjacencyOptions) => EdgeList;
    public getPosition!: () => {x: number; y: number};
}

export class NodeList extends ElementList<Node> {}

export class Edge extends Element<Edge, EdgeList> {
    private id!: any;
    private source!: any;
    private target!: any;
    private data!: any;

    public constructor({id, source, target, data}: {id: any; source: any; target: any; data?: any}) {
        super();

        this.id = id;
        this.source = source;
        this.target = target;
        this.data = data;
    }

    public getSource!: () => Node;
    public getTarget!: () => Node;
}

export class EdgeList extends ElementList<Edge> {}

export interface AdjacencyOptions {
    bothExtremities?: boolean;
    direction?: 'both' | 'in' | 'out';
    filter?: 'visible' | 'raw' | 'all';
    policy?: 'union' | 'include-sources' | 'exclude-sources';
}

export enum Layout {
    FORCE = 1,
    FORCE_LINK,
    GRID,
    RADIAL,
    SEQUENTIAL,
    HIERARCHICAL,
}

export enum Direction {
    TB = 'TB',
    BT = 'BT',
    LR = 'LR',
    RL = 'RL',
}

export enum Selector {
    DEFAULT,
    RECTANGLE,
    LASSO,
}

export enum ClassName {
    IDLE = 'IDLE',
    PATH = 'PATH',
    SECONDARY = 'SECONDARY',
    DISABLED = 'DISABLED',
}

export interface OgmaAnimationStep extends AnimationStep {
    actions: OgmaAnimationAction[];
}

export interface OgmaAnimationAction extends AnimationAction {
    element: Element<Node | Edge, NodeList | EdgeList>;
    actionType: OgmaAnimationActionType;
    actionData: any;
}

export enum OgmaAnimationActionType {
    ADD_ELEMENT,
    REMOVE_ELEMENT,
    ADD_CLASS,
    REMOVE_CLASS,
    REWIRE,
    ADD_EDGE,
    REMOVE_EDGE,
}
