import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Chapter07Component} from './chapter07.component';
import {Chapter07ExampleComponent} from './chapter07-example/chapter07-example.component';
import {Chapter07Example01Component} from './chapter07-example01/chapter07-example01.component';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    declarations: [Chapter07Component, Chapter07ExampleComponent, Chapter07Example01Component],
    imports: [CommonModule, ComponentsModule],
})
export class Chapter07Module {}
