import {Injectable} from '@angular/core';

// @ts-ignore
import * as Ogma from '../../../scripts/ogma.min';
import {
    AttributeAnimationOptions,
    ClassName,
    Direction,
    Easing,
    Edge,
    EdgeList,
    Element,
    Layout,
    Node,
    NodeList,
    OgmaAnimationActionType,
    OgmaAnimationStep,
} from '../models/ogma';

@Injectable({
    providedIn: 'root',
})
export class OgmaService {
    private readonly COLOR_PRIMARY: string = '#3377ff';
    private readonly COLOR_SECONDARY: string = '#6a40bf';
    private readonly COLOR_SUCCESS: string = '#00cc00';
    private readonly COLOR_WARNING: string = '#cc4400';
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

    private readonly ATTRIBUTE_ANIMATION_OPTIONS: AttributeAnimationOptions = {
        duration: 0,
        easing: Easing.LINEAR,
    };

    private readonly DEFAULT_NODE_ATTRIBUTE_TEXT = {
        color: this.COLOR_LIGHT,
        minVisibleSize: 10,
        position: 'center',
        font: 'Consolas',
        scale: 0.5,
        scaling: true,
    };

    private readonly DEFAULT_Edge_ATTRIBUTE_TEXT = {
        backgroundColor: 'transparent',
        color: this.COLOR_DARK,
        minVisibleSize: 0,
        font: 'Consolas',
        scale: 10,
        scaling: true,
    };

    private readonly HOVERED_NODE_ATTRIBUTES = {
        outline: false,
        outerStroke: {
            color: this.COLOR_PRIMARY,
        },
        text: {
            backgroundColor: null,
        },
    };

    private readonly SELECTED_NODE_ATTRIBUTES = {
        color: this.COLOR_SECONDARY,
        outline: false,
        outerStroke: {
            color: this.COLOR_SECONDARY,
        },
        text: {
            backgroundColor: null,
        },
    };

    private readonly HOVERED_EDGE_ATTRIBUTES = {
        color: this.COLOR_PRIMARY,
        text: {
            backgroundColor: 'transparent',
        },
    };

    private readonly SELECTED_EDGE_ATTRIBUTES = {
        color: this.COLOR_SECONDARY,
    };

    public readonly FAKE_ELEMENT = new Element();

    public attachClasses(ogma: Ogma, isDirected: boolean): void {
        ogma.styles.createClass({
            name: ClassName.IDLE,
            nodeAttributes: {
                color: this.COLOR_PRIMARY,
                radius: 24,
                shape: 'circle',
                text: this.DEFAULT_NODE_ATTRIBUTE_TEXT,
            },
            edgeAttributes: {
                color: this.COLOR_DARK,
                shape: isDirected ? 'arrow' : 'line',
                width: 3,
                text: this.DEFAULT_Edge_ATTRIBUTE_TEXT,
            },
        });

        ogma.styles.createClass({
            name: ClassName.PATH,
            nodeAttributes: {color: this.COLOR_WARNING},
            edgeAttributes: {
                color: this.COLOR_WARNING,
                width: 5,
            },
        });

        ogma.styles.createClass({
            name: ClassName.SECONDARY,
            nodeAttributes: {color: this.COLOR_SECONDARY},
            edgeAttributes: {
                color: this.COLOR_SECONDARY,
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
        ogma.styles.setHoveredNodeAttributes(this.HOVERED_NODE_ATTRIBUTES);
        ogma.styles.setHoveredEdgeAttributes(this.HOVERED_EDGE_ATTRIBUTES);

        ogma.styles.setSelectedNodeAttributes(this.SELECTED_NODE_ATTRIBUTES);
        ogma.styles.setSelectedEdgeAttributes(this.SELECTED_EDGE_ATTRIBUTES);
    }

    public async setLayout(ogma: Ogma, layout: Layout, centralNode?: Node, direction?: Direction): Promise<void> {
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
                    centerX: centralNode?.getPosition().x,
                    centerY: centralNode?.getPosition().y,
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
                    direction: direction || 'TB',
                    duration: this.ANIMATION_DURATION,
                    gridDistance: this.GRID_DISTANCE,
                    levelDistance: this.LEVEL_DISTANCE,
                    nodeDistance: this.NODE_DISTANCE,
                    locate: true,
                });
                break;
            case Layout.HIERARCHICAL:
                await ogma.layouts.hierarchical({
                    arrangeComponents: 'grid',
                    componentDistance: this.COMPONENT_DISTANCE,
                    direction: direction || 'TB',
                    duration: this.ANIMATION_DURATION,
                    gridDistance: this.GRID_DISTANCE,
                    levelDistance: this.LEVEL_DISTANCE,
                    nodeDistance: this.NODE_DISTANCE,
                    locate: true,
                });
                break;
            case Layout.TREE:
                await this.setTreeLayout(ogma, centralNode);
                break;
            default:
                return;
        }

        ogma.getNodes().locate({duration: this.ANIMATION_DURATION});
    }

    public generateLinkedListNodeRawData(node: Node): any {
        const edge = node.getAdjacentEdges().toArray()[0];

        return {
            id: node.getId(),
            attributes: node.getAttributes(),
            data: node.getData(),
            edge: {
                id: edge.getId(),
                source: edge.getSource().getId(),
                target: edge.getTarget().getId(),
                data: edge.getData(),
            },
        };
    }

    public generateAddClassNameStep(
        animationSteps: OgmaAnimationStep[],
        element: Element<Node | Edge, NodeList | EdgeList>,
        className: ClassName = ClassName.PATH
    ): void {
        animationSteps.push({
            actions: [{element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className}}],
        });
    }

    public generateAddClassNameByIdStep(
        animationSteps: OgmaAnimationStep[],
        id: number,
        className: ClassName = ClassName.PATH
    ): void {
        animationSteps.push({
            actions: [
                {
                    element: this.FAKE_ELEMENT,
                    actionType: OgmaAnimationActionType.ADD_CLASS_BY_ID,
                    actionData: {id, className},
                },
            ],
        });
    }

    public generateRemoveClassNameStep(
        animationSteps: OgmaAnimationStep[],
        element: Element<Node | Edge, NodeList | EdgeList>,
        className: ClassName = ClassName.PATH
    ): void {
        animationSteps.push({
            actions: [{element, actionType: OgmaAnimationActionType.REMOVE_CLASS, actionData: {className}}],
        });
    }

    public generateRemovePathClassNameStep(
        animationSteps: OgmaAnimationStep[],
        element: Element<Node | Edge, NodeList | EdgeList>
    ): void {
        animationSteps.push({
            actions: [
                {element, actionType: OgmaAnimationActionType.REMOVE_CLASS, actionData: {className: ClassName.PATH}},
                {element, actionType: OgmaAnimationActionType.ADD_CLASS, actionData: {className: ClassName.DISABLED}},
            ],
        });
    }

    public generateRewireStep(animationSteps: OgmaAnimationStep[], edge: Edge, newTarget: Node): void {
        animationSteps.push({
            actions: [
                {
                    element: edge,
                    actionType: OgmaAnimationActionType.REWIRE,
                    actionData: {oldTarget: edge.getTarget().getId(), newTarget: newTarget.getId()},
                },
            ],
        });
    }

    public generateRemoveElementStep(
        animationSteps: OgmaAnimationStep[],
        element: Element<Node | Edge, NodeList | EdgeList>,
        actionData: any
    ): void {
        animationSteps.push({
            actions: [
                {
                    element,
                    actionType: OgmaAnimationActionType.REMOVE_ELEMENT,
                    actionData,
                },
            ],
        });
    }

    private async setTreeLayout(ogma: Ogma, root?: Node): Promise<void> {
        const nodes: Node[] = ogma.getNodes().toArray();
        root = nodes.find((x) => x.getAdjacentEdges({direction: 'in'}).size === 0);

        let depth = 0;
        let branchingFactor = 0;
        await this.dfs(
            null,
            root || nodes[0],
            0,
            0,
            async (parent: Node, currentNode: Node, currentDepth: number, edgeIndex: number, edges: Edge[]) => {
                if (depth < currentDepth) depth = currentDepth;
                if (branchingFactor < edges.length) branchingFactor = edges.length;
            }
        );

        await this.dfs(
            null,
            root || nodes[0],
            0,
            0,
            async (parent: Node, currentNode: Node, currentDepth: number, edgeIndex: number) => {
                if (!parent) {
                    await currentNode.setAttribute('x', 0, this.ATTRIBUTE_ANIMATION_OPTIONS);
                    await currentNode.setAttribute('y', 0, this.ATTRIBUTE_ANIMATION_OPTIONS);
                    return;
                }

                const parentX = +parent.getAttribute('x');
                const parentY = +parent.getAttribute('y');

                let xMultiplier;
                if (branchingFactor % 2 === 0) {
                    xMultiplier = edgeIndex - branchingFactor / 2;
                    xMultiplier += 0.5;
                } else {
                    xMultiplier = edgeIndex - (branchingFactor - 1) / 2;
                }

                const x =
                    parentX + (Math.pow(branchingFactor, depth - currentDepth) * xMultiplier * this.NODE_DISTANCE) / 2;
                const y = parentY + this.LEVEL_DISTANCE;

                await currentNode.setAttribute('x', x, this.ATTRIBUTE_ANIMATION_OPTIONS);
                await currentNode.setAttribute('y', y, this.ATTRIBUTE_ANIMATION_OPTIONS);
            }
        );
    }

    private async dfs(
        parent: Node | null,
        currentNode: Node,
        currentDepth: number,
        edgeIndex: number,
        callback: Function
    ): Promise<void> {
        const edges: Edge[] = currentNode.getAdjacentEdges({direction: 'out'}).toArray();

        await callback(parent, currentNode, currentDepth, currentNode.getData('index') ?? edgeIndex, edges);

        edges.forEach((edge, index) => {
            const nextNode = edge.getTarget();
            this.dfs(currentNode, nextNode, currentDepth + 1, index, callback);
        });
    }
}
