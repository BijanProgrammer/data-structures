import {Injectable} from '@angular/core';

// @ts-ignore
import * as Ogma from '../../../scripts/ogma.min';

@Injectable({
    providedIn: 'root',
})
export class OgmaService {
    private readonly COLOR_PRIMARY: string = '#3377ff';
    private readonly COLOR_LIGHT: string = '#fafafa';
    private readonly COLOR_DARK: string = '#1a1a1a';

    public readonly ANIMATION_DURATION: number = 300;
    public readonly COMPONENT_DISTANCE: number = 200;
    public readonly NODE_DISTANCE: number = 200;
    public readonly GRID_DISTANCE: number = 150;
    public readonly LEVEL_DISTANCE: number = 150;

    private readonly DEFAULT_ATTRIBUTE_TEXT = {
        color: this.COLOR_LIGHT,
        minVisibleSize: 10,
        position: 'center',
        font: 'Consolas',
        scale: 0.5,
        scaling: true,
    };

    public attachClasses(ogma: Ogma): void {
        ogma.styles.createClass({
            name: OgmaClassName.IDLE,
            nodeAttributes: {color: this.COLOR_PRIMARY, radius: 24, shape: 'circle', text: this.DEFAULT_ATTRIBUTE_TEXT},
            edgeAttributes: {
                color: this.COLOR_DARK,
                shape: 'arrow',
                width: 3,
            },
        });
    }

    public setStateAttributes(ogma: Ogma): void {
        const nodeAttributes = {
            outline: false,
            outerStroke: {
                color: this.COLOR_PRIMARY,
            },
            text: {
                backgroundColor: null,
            },
        };

        const edgeAttributes = {
            color: this.COLOR_PRIMARY,
        };

        ogma.styles.setHoveredNodeAttributes(nodeAttributes);
        ogma.styles.setHoveredEdgeAttributes(edgeAttributes);

        ogma.styles.setSelectedNodeAttributes(nodeAttributes);
        ogma.styles.setSelectedEdgeAttributes(edgeAttributes);
    }
}

export enum OgmaClassName {
    IDLE = 'IDLE',
}
