import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {PlaygroundComponent} from './pages/playground/playground.component';

import {Chapter02Component} from './pages/chapter02/chapter02.component';
import {Chapter04Component} from './pages/chapter04/chapter04.component';
import {Chapter05Component} from './pages/chapter05/chapter05.component';
import {Chapter07Component} from './pages/chapter07/chapter07.component';

import {RggComponent} from './pages/rgg/rgg.component';
import {RtgComponent} from './pages/rtg/rtg.component';
import {TreeTraversalComponent} from './pages/tree-traversal/tree-traversal.component';
import {BinarySearchTreeComponent} from './pages/binary-search-tree/binary-search-tree.component';
import {HuffmanComponent} from './pages/huffman/huffman.component';
import {DfsComponent} from './pages/dfs/dfs.component';
import {BfsComponent} from './pages/bfs/bfs.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'playground', component: PlaygroundComponent},
    {path: 'chapter02', component: Chapter02Component},
    {path: 'chapter04', component: Chapter04Component},
    {path: 'chapter05', component: Chapter05Component},
    {path: 'chapter07', component: Chapter07Component},
    {path: 'rgg', component: RggComponent},
    {path: 'rtg', component: RtgComponent},
    {path: 'tree-traversal', component: TreeTraversalComponent},
    {path: 'binary-search-tree', component: BinarySearchTreeComponent},
    {path: 'huffman', component: HuffmanComponent},
    {path: 'dfs', component: DfsComponent},
    {path: 'bfs', component: BfsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
