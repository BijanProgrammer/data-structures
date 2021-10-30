import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MonacoEditorModule} from 'ngx-monaco-editor';
import {MathjaxModule} from 'mathjax-angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import {Chapter02Component} from './pages/chapter02/chapter02.component';
import {LatexComponent} from './components/latex/latex.component';
import {MonacoComponent} from './components/monaco/monaco.component';
import {FormsModule} from '@angular/forms';
import {PlaygroundComponent} from './pages/playground/playground.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        Chapter02Component,
        LatexComponent,
        MonacoComponent,
        PlaygroundComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, MonacoEditorModule.forRoot(), MathjaxModule.forRoot(), FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
