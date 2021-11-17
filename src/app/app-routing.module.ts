import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {Chapter02Component} from './pages/chapter02/chapter02.component';
import {Chapter04Component} from './pages/chapter04/chapter04.component';
import {Chapter05Component} from './pages/chapter05/chapter05.component';
import {PlaygroundComponent} from './pages/playground/playground.component';
import {RggComponent} from './pages/rgg/rgg.component';
import {DfsComponent} from './pages/dfs/dfs.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'chapter02', component: Chapter02Component},
    {path: 'chapter04', component: Chapter04Component},
    {path: 'chapter05', component: Chapter05Component},
    {path: 'playground', component: PlaygroundComponent},
    {path: 'rgg', component: RggComponent},
    {path: 'dfs', component: DfsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
