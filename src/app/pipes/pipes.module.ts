import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClonePipe} from './clone.pipe';
import {InstanceOfPipe} from './instance-of.pipe';
import {ReversePipe} from './reverse.pipe';
import {SpreadArrayPipe} from './spread-array.pipe';
import {ToCharArrayPipe} from './toCharArray.pipe';
import {WordsToTitleCasePipe} from './words-to-title-case.pipe';

@NgModule({
    declarations: [ClonePipe, InstanceOfPipe, ReversePipe, SpreadArrayPipe, ToCharArrayPipe, WordsToTitleCasePipe],
    imports: [CommonModule],
    exports: [ClonePipe, InstanceOfPipe, ReversePipe, SpreadArrayPipe, ToCharArrayPipe, WordsToTitleCasePipe],
})
export class PipesModule {}
