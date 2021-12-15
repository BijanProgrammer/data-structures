import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BfsComponent} from './bfs/bfs.component';
import {Chapter02Component} from './chapter02/chapter02.component';
import {Chapter04Component} from './chapter04/chapter04.component';
import {Chapter05Component} from './chapter05/chapter05.component';
import {DfsComponent} from './dfs/dfs.component';
import {ExampleComponent} from './chapter02/example/example.component';
import {ExpressionComponent} from './chapter05/expression/expression.component';
import {HomeComponent} from './home/home.component';
import {InfixToSuffixComponent} from './chapter05/infix-to-suffix/infix-to-suffix.component';
import {PlaygroundComponent} from './playground/playground.component';
import {ProblemComponent} from './chapter02/problem/problem.component';
import {QueuePlaygroundComponent} from './chapter04/queue-playground/queue-playground.component';
import {RggComponent} from './rgg/rgg.component';
import {RtgComponent} from './rtg/rtg.component';
import {ComponentsModule} from '../components/components.module';
import {PipesModule} from '../pipes/pipes.module';
import {IconsModule} from '../icons/icons.module';
import {Chapter07Module} from './chapter07/chapter07.module';
import {TreeTraversalComponent} from './tree-traversal/tree-traversal.component';

@NgModule({
    declarations: [
        BfsComponent,
        Chapter02Component,
        Chapter04Component,
        Chapter05Component,
        DfsComponent,
        ExampleComponent,
        ExpressionComponent,
        HomeComponent,
        InfixToSuffixComponent,
        PlaygroundComponent,
        ProblemComponent,
        QueuePlaygroundComponent,
        RggComponent,
        RtgComponent,
        TreeTraversalComponent,
    ],
    imports: [CommonModule, ComponentsModule, IconsModule, PipesModule],
    exports: [
        BfsComponent,
        Chapter02Component,
        Chapter04Component,
        Chapter05Component,
        Chapter07Module,
        DfsComponent,
        ExampleComponent,
        ExpressionComponent,
        HomeComponent,
        InfixToSuffixComponent,
        PlaygroundComponent,
        ProblemComponent,
        QueuePlaygroundComponent,
        RggComponent,
        RtgComponent,
    ],
})
export class PagesModule {}
