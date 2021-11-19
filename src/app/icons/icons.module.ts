import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CloseComponent} from './close/close.component';
import {HamburgerComponent} from './hamburger/hamburger.component';
import {NextComponent} from './next/next.component';
import {PauseComponent} from './pause/pause.component';
import {PlayComponent} from './play/play.component';
import {PreviousComponent} from './previous/previous.component';
import {ResetComponent} from './reset/reset.component';
import {StopComponent} from './stop/stop.component';

@NgModule({
    declarations: [
        CloseComponent,
        HamburgerComponent,
        NextComponent,
        PauseComponent,
        PlayComponent,
        PreviousComponent,
        ResetComponent,
        StopComponent,
    ],
    imports: [CommonModule],
    exports: [
        CloseComponent,
        HamburgerComponent,
        NextComponent,
        PauseComponent,
        PlayComponent,
        PreviousComponent,
        ResetComponent,
        StopComponent,
    ],
})
export class IconsModule {}
