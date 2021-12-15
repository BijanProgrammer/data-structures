import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {KatexModule} from 'ng-katex';
import {MonacoEditorModule} from 'ngx-monaco-editor';

import {IconsModule} from '../icons/icons.module';
import {PipesModule} from '../pipes/pipes.module';

import {AnimatorComponent} from './animator/animator.component';
import {GraphAnimatorComponent} from './graph-animator/graph-animator.component';
import {GraphHeaderComponent} from './graph-header/graph-header.component';
import {GraphSearchComponent} from './graph-search/graph-search.component';
import {GraphVisualizerComponent} from './graph-visualizer/graph-visualizer.component';
import {HeaderComponent} from './header/header.component';
import {MonacoComponent} from './monaco/monaco.component';
import {MultiTexComponent} from './multi-tex/multi-tex.component';
import {QueueComponent} from './queue/queue.component';
import {StackComponent} from './stack/stack.component';
import {TexComponent} from './tex/tex.component';
import {TextParserComponent} from './text-parser/text-parser.component';
import {UnderConstructionComponent} from './under-construction/under-construction.component';

@NgModule({
    declarations: [
        AnimatorComponent,
        GraphAnimatorComponent,
        GraphHeaderComponent,
        GraphSearchComponent,
        GraphVisualizerComponent,
        HeaderComponent,
        MonacoComponent,
        MultiTexComponent,
        QueueComponent,
        StackComponent,
        TexComponent,
        TextParserComponent,
        UnderConstructionComponent,
    ],
    imports: [CommonModule, FormsModule, RouterModule, KatexModule, MonacoEditorModule, IconsModule, PipesModule],
    exports: [
        AnimatorComponent,
        GraphAnimatorComponent,
        GraphHeaderComponent,
        GraphSearchComponent,
        GraphVisualizerComponent,
        HeaderComponent,
        MonacoComponent,
        MultiTexComponent,
        QueueComponent,
        StackComponent,
        TexComponent,
        TextParserComponent,
        UnderConstructionComponent,
    ],
})
export class ComponentsModule {}
