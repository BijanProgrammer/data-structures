import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {Chapter02Component} from './pages/chapter02/chapter02.component';
import {PlaygroundComponent} from './pages/playground/playground.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'chapter02', component: Chapter02Component},
    {path: 'playground', component: PlaygroundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
