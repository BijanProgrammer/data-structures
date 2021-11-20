import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CloseComponent} from './close/close.component';
import {CollapsedComponent} from './collapsed/collapsed.component';
import {DiceComponent} from './dice/dice.component';
import {DownloadComponent} from './download/download.component';
import {ExpandedComponent} from './expanded/expanded.component';
import {HamburgerComponent} from './hamburger/hamburger.component';
import {NextComponent} from './next/next.component';
import {PauseComponent} from './pause/pause.component';
import {PlayComponent} from './play/play.component';
import {PreviousComponent} from './previous/previous.component';
import {ResetComponent} from './reset/reset.component';
import {ShuffleComponent} from './shuffle/shuffle.component';
import {StopComponent} from './stop/stop.component';
import {UploadComponent} from './upload/upload.component';

@NgModule({
    declarations: [
        CloseComponent,
        CollapsedComponent,
        DiceComponent,
        DownloadComponent,
        ExpandedComponent,
        HamburgerComponent,
        NextComponent,
        PauseComponent,
        PlayComponent,
        PreviousComponent,
        ResetComponent,
        ShuffleComponent,
        StopComponent,
        UploadComponent,
    ],
    imports: [CommonModule],
    exports: [
        CloseComponent,
        CollapsedComponent,
        DiceComponent,
        DownloadComponent,
        ExpandedComponent,
        HamburgerComponent,
        NextComponent,
        PauseComponent,
        PlayComponent,
        PreviousComponent,
        ResetComponent,
        ShuffleComponent,
        StopComponent,
        UploadComponent,
    ],
})
export class IconsModule {}
