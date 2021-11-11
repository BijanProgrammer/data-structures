import {Injectable} from '@angular/core';

// @ts-ignore
import * as Ogma from '../../../scripts/ogma.min';
import {Layout, ClassName} from '../models/ogma';

@Injectable({
    providedIn: 'root',
})
export class OgmaService {
    private readonly COLOR_IDLE: string = '#3377ff';
    private readonly COLOR_PATH: string = '#cc4400';
    private readonly COLOR_LIGHT: string = '#fafafa';
    private readonly COLOR_DARK: string = '#1a1a1a';
    private readonly COLOR_DISABLED: string = '#b3b3b3';

    public readonly ANIMATION_DURATION: number = 300;
    public readonly CHARGE: number = 50;
    public readonly COMPONENT_DISTANCE: number = 200;
    public readonly EDGE_LENGTH: number = 200;
    public readonly EDGE_STRENGTH: number = 0.5;
    public readonly NODE_DISTANCE: number = 250;
    public readonly GRID_DISTANCE: number = 150;
    public readonly LEVEL_DISTANCE: number = 150;
    public readonly NODE_GAP: number = 150;
    public readonly RADIUS_DELTA: number = 150;
    public readonly REPULSION: number = 20;

    private readonly DEFAULT_ATTRIBUTE_TEXT = {
        color: this.COLOR_LIGHT,
        minVisibleSize: 10,
        position: 'center',
        font: 'Consolas',
        scale: 0.5,
        scaling: true,
    };

    public attachClasses(ogma: Ogma, isDirected: boolean): void {
        ogma.styles.createClass({
            name: ClassName.IDLE,
            nodeAttributes: {color: this.COLOR_IDLE, radius: 24, shape: 'circle', text: this.DEFAULT_ATTRIBUTE_TEXT},
            edgeAttributes: {
                color: this.COLOR_DARK,
                shape: isDirected ? 'arrow' : 'line',
                width: 3,
            },
        });

        ogma.styles.createClass({
            name: ClassName.PATH,
            nodeAttributes: {color: this.COLOR_PATH},
            edgeAttributes: {
                color: this.COLOR_PATH,
                width: 5,
            },
        });

        ogma.styles.createClass({
            name: ClassName.DISABLED,
            nodeAttributes: {color: this.COLOR_DISABLED},
            edgeAttributes: {color: this.COLOR_DISABLED},
        });
    }

    public setStateAttributes(ogma: Ogma): void {
        const nodeAttributes = {
            outline: false,
            outerStroke: {
                color: this.COLOR_IDLE,
            },
            text: {
                backgroundColor: null,
            },
        };

        const edgeAttributes = {
            color: this.COLOR_IDLE,
        };

        ogma.styles.setHoveredNodeAttributes(nodeAttributes);
        ogma.styles.setHoveredEdgeAttributes(edgeAttributes);

        ogma.styles.setSelectedNodeAttributes(nodeAttributes);
        ogma.styles.setSelectedEdgeAttributes(edgeAttributes);
    }

    public async setLayout(ogma: Ogma, layout: Layout, centralNode?: any): Promise<void> {
        switch (layout) {
            case Layout.FORCE:
                await ogma.layouts.force({
                    charge: this.CHARGE,
                    duration: this.ANIMATION_DURATION,
                    edgeLength: this.EDGE_LENGTH,
                    edgeStrength: this.EDGE_STRENGTH,
                    locate: true,
                });
                break;
            case Layout.FORCE_LINK:
                await ogma.layouts.forceLink({
                    duration: this.ANIMATION_DURATION,
                    locate: true,
                });
                break;
            case Layout.GRID:
                await ogma.layouts.grid({
                    duration: this.ANIMATION_DURATION,
                    locate: true,
                });
                break;
            case Layout.RADIAL:
                await ogma.layouts.radial({
                    centerX: centralNode.getPosition().x,
                    centerY: centralNode.getPosition().y,
                    centralNode: centralNode,
                    duration: this.ANIMATION_DURATION,
                    locate: true,
                    nodeGap: this.NODE_GAP,
                    radiusDelta: this.RADIUS_DELTA,
                    repulsion: this.REPULSION,
                });
                break;
            case Layout.SEQUENTIAL:
                await ogma.layouts.sequential({
                    arrangeComponents: 'grid',
                    componentDistance: this.COMPONENT_DISTANCE,
                    direction: 'TB',
                    duration: this.ANIMATION_DURATION,
                    gridDistance: this.GRID_DISTANCE,
                    levelDistance: this.LEVEL_DISTANCE,
                    locate: true,
                    nodeDistance: this.NODE_DISTANCE,
                });
                break;
            default:
                return;
        }

        ogma.getNodes().locate({duration: this.ANIMATION_DURATION});
    }
}
