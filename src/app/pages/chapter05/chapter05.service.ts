import {Injectable} from '@angular/core';
import {Stack} from '../../models/stack';

@Injectable({
    providedIn: 'root',
})
export class Chapter05Service {
    private readonly LOST_CELLS: string[] = ['4', '8', '15', '16', '23', '42'];

    public generateEmptyStack(): Stack {
        return new Stack(10);
    }

    public generateLostStack(): Stack {
        return new Stack(10, JSON.parse(JSON.stringify(this.LOST_CELLS)));
    }
}
