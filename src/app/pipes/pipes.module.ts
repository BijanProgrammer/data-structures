import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClonePipe} from './clone.pipe';
import {InstanceOfPipe} from './instance-of.pipe';
import {ReversePipe} from './reverse.pipe';
import {SpreadArrayPipe} from './spread-array.pipe';
import {ToCharArrayPipe} from './toCharArray.pipe';

@NgModule({
    declarations: [ClonePipe, InstanceOfPipe, ReversePipe, SpreadArrayPipe, ToCharArrayPipe],
    imports: [CommonModule],
    exports: [ClonePipe, InstanceOfPipe, ReversePipe, SpreadArrayPipe, ToCharArrayPipe],
})
export class PipesModule {}
