export enum Layout {
    FORCE,
    FORCE_LINK,
    GRID,
    RADIAL,
    SEQUENTIAL,
}

export enum ClassName {
    IDLE = 'IDLE',
    PATH = 'PATH',
    DISABLED = 'DISABLED',
}

export interface AnimationStep {
    actions: AnimationAction[];
}

export interface AnimationAction {
    element: any;
    actionType: AnimationActionType;
    actionData: any;
}

export enum AnimationActionType {
    ADD_CLASS,
    REMOVE_CLASS,
}
