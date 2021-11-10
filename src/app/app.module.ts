import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {MonacoEditorModule} from 'ngx-monaco-editor';
import {KatexModule} from 'ng-katex';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HomeComponent} from './pages/home/home.component';

import {PlaygroundComponent} from './pages/playground/playground.component';

import {Chapter02Component} from './pages/chapter02/chapter02.component';
import {ExampleComponent} from './pages/chapter02/example/example.component';
import {ProblemComponent} from './pages/chapter02/problem/problem.component';

import {Chapter04Component} from './pages/chapter04/chapter04.component';
import {QueuePlaygroundComponent} from './pages/chapter04/queue-playground/queue-playground.component';

import {DfsComponent} from './pages/dfs/dfs.component';
import {RggComponent} from './pages/rgg/rgg.component';

import {HeaderComponent} from './components/header/header.component';
import {QueueComponent} from './components/queue/queue.component';
import {MonacoComponent} from './components/monaco/monaco.component';
import {MultiTexComponent} from './components/multi-tex/multi-tex.component';
import {TexComponent} from './components/tex/tex.component';
import {TextParserComponent} from './components/text-parser/text-parser.component';
import {GraphVisualizerComponent} from './components/graph-visualizer/graph-visualizer.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        Chapter02Component,
        MultiTexComponent,
        MonacoComponent,
        PlaygroundComponent,
        ExampleComponent,
        ProblemComponent,
        TextParserComponent,
        TexComponent,
        Chapter04Component,
        QueuePlaygroundComponent,
        QueueComponent,
        GraphVisualizerComponent,
        DfsComponent,
        RggComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, MonacoEditorModule.forRoot(), KatexModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
