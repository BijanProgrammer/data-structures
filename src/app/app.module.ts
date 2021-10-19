import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MathjaxModule} from 'mathjax-angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import {Chapter02Component} from './pages/chapter02/chapter02.component';
import {LatexComponent} from './components/latex/latex.component';

@NgModule({
    declarations: [AppComponent, HeaderComponent, HomeComponent, Chapter02Component, LatexComponent],
    imports: [BrowserModule, AppRoutingModule, MathjaxModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
