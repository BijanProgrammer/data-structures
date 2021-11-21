import {AnimationAction, AnimationStep} from './animator';

export class RawGraph {
    public nodes!: any[];
    public edges!: any[];
}

export enum Layout {
    FORCE,
    FORCE_LINK,
    GRID,
    RADIAL,
    SEQUENTIAL,
}

export enum Selector {
    DEFAULT,
    RECTANGLE,
    LASSO,
}

export enum ClassName {
    IDLE = 'IDLE',
    PATH = 'PATH',
    DISABLED = 'DISABLED',
}

export interface OgmaAnimationStep extends AnimationStep {
    actions: OgmaAnimationAction[];
}

export interface OgmaAnimationAction extends AnimationAction {
    element: any;
    actionType: OgmaAnimationActionType;
    actionData: any;
}

export enum OgmaAnimationActionType {
    ADD_CLASS,
    REMOVE_CLASS,
}
