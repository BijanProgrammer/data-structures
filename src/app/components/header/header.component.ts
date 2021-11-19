import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public navExpanded: boolean = false;

    public constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) this.navExpanded = false;
        });
    }
}
