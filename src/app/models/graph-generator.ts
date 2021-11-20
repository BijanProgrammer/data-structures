import {GraphVisualizerComponent} from '../components/graph-visualizer/graph-visualizer.component';

export abstract class GraphGenerator {
    public abstract generateGraph(graphVisualizerComponent: GraphVisualizerComponent): {nodes: any[]; edges: any[]};
}

export class SimpleDfsGraphGenerator extends GraphGenerator {
    private static readonly NODES: any[] = [
        {id: 1, attributes: {text: 1}, data: {visited: false}},
        {id: 2, attributes: {text: 2}, data: {visited: false}},
        {id: 3, attributes: {text: 3}, data: {visited: false}},
        {id: 4, attributes: {text: 4}, data: {visited: false}},
        {id: 5, attributes: {text: 5}, data: {visited: false}},
        {id: 6, attributes: {text: 6}, data: {visited: false}},
        {id: 7, attributes: {text: 7}, data: {visited: false}},
    ];

    private static readonly EDGES: any[] = [
        {id: 1, source: 1, target: 2, data: {visited: false}},
        {id: 3, source: 1, target: 5, data: {visited: false}},

        {id: 5, source: 2, target: 3, data: {visited: false}},
        {id: 7, source: 2, target: 4, data: {visited: false}},

        {id: 9, source: 3, target: 6, data: {visited: false}},

        {id: 11, source: 4, target: 6, data: {visited: false}},

        {id: 13, source: 5, target: 7, data: {visited: false}},

        {id: 15, source: 6, target: 7, data: {visited: false}},
    ];

    public generateGraph(): {nodes: any[]; edges: any[]} {
        const graph = {nodes: SimpleDfsGraphGenerator.NODES, edges: SimpleDfsGraphGenerator.EDGES};
        return JSON.parse(JSON.stringify(graph));
    }
}

export class RandomGraphGenerator extends GraphGenerator {
    public constructor(private nodesMaximumCount = 20, private edgesMaximumCount = 30) {
        super();
    }

    public generateGraph(): {nodes: any[]; edges: any[]} {
        const nodesCount = Math.floor(Math.random() * this.nodesMaximumCount) + 1;
        const edgesCount = Math.floor(Math.random() * this.edgesMaximumCount);

        const nodes: any[] = RandomGraphGenerator.generateNodes(nodesCount);
        const edges: any[] = RandomGraphGenerator.generateEdges(nodesCount, edgesCount);

        return JSON.parse(JSON.stringify({nodes, edges}));
    }

    private static generateNodes(nodesCount: number): any[] {
        const width = 800;
        const height = 600;

        const nodes = [];
        for (let i = 0; i < nodesCount; i++) {
            const randomX = Math.random() * width - width / 2;
            const randomY = Math.random() * height - height / 2;

            const data = {name: `node #${i}`};
            const attributes = {x: randomX, y: randomY, text: i + 1};

            const node: any = {id: i + 1, data, attributes};
            nodes.push(node);
        }

        return nodes;
    }

    private static generateEdges(nodesCount: number, edgesCount: number): any[] {
        const edges = [];
        for (let i = 0; i < edgesCount; i++) {
            const sourceId = Math.floor(Math.random() * nodesCount) + 1;
            const targetId = Math.floor(Math.random() * nodesCount) + 1;

            if (sourceId === targetId && nodesCount !== 1) {
                i--;
                continue;
            }

            edges.push({id: 'e' + i, source: sourceId, target: targetId, data: {name: `edge #${i}`}});
        }

        return edges;
    }
}
