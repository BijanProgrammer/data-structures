import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {MonacoEditorModule} from 'ngx-monaco-editor-v2';
import {KatexModule} from 'ng-katex';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ComponentsModule} from './components/components.module';
import {IconsModule} from './icons/icons.module';
import {PagesModule} from './pages/pages.module';
import {PipesModule} from './pipes/pipes.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MonacoEditorModule.forRoot(),
        KatexModule,
        ComponentsModule,
        IconsModule,
        PagesModule,
        PipesModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
