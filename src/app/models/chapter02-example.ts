import {TableSolution} from './table-solution';
import {SigmaSolution} from './sigma-solution';

export interface Chapter02Example {
    code: string;
    tableSolution: TableSolution;
    sigmaSolution: SigmaSolution;
    complexity: string;
}
