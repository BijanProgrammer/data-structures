import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Chapter07Component} from './chapter07.component';
import {Chapter07ExampleComponent} from './chapter07-example/chapter07-example.component';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
    declarations: [Chapter07Component, Chapter07ExampleComponent],
    imports: [CommonModule, ComponentsModule],
})
export class Chapter07Module {}
