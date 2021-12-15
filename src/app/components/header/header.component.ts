import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

interface Navigation {
    isMega: boolean;
    title: string;

    routerLink?: string;
    exact?: boolean;

    subNavigations?: Navigation[];
    isExpanded?: boolean;
    isActive?: boolean;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public navExpanded: boolean = false;

    public navigations: Navigation[] = [
        {isMega: false, title: 'Home', routerLink: '/', exact: true},
        {isMega: false, title: 'Playground', routerLink: '/playground'},
        {
            isMega: true,
            title: 'Book',
            subNavigations: [
                {isMega: false, title: 'Chapter 02', routerLink: '/chapter02'},
                {isMega: false, title: 'Chapter 04', routerLink: '/chapter04'},
                {isMega: false, title: 'Chapter 05', routerLink: '/chapter05'},
                {isMega: false, title: 'Chapter 07', routerLink: '/chapter07'},
            ],
        },
        {
            isMega: true,
            title: 'Graph',
            subNavigations: [
                {isMega: false, title: 'Random Graph Generator', routerLink: '/rgg'},
                {isMega: false, title: 'Random Tree Generator', routerLink: '/rtg'},
                {isMega: false, title: 'Tree Traversal', routerLink: '/tree-traversal'},
                {isMega: false, title: 'Depth-first Search', routerLink: '/dfs'},
                {isMega: false, title: 'Breadth-first Search', routerLink: '/bfs'},
            ],
        },
    ];

    public constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.navExpanded = false;

                this.navigations
                    .filter((navigation) => navigation.isMega)
                    .forEach((navigation) => {
                        const index = navigation.subNavigations?.findIndex(
                            (subNavigation) => subNavigation.routerLink === this.router.url
                        );

                        if (index === -1) {
                            navigation.isExpanded = false;
                            navigation.isActive = false;
                            return;
                        }

                        navigation.isExpanded = true;
                        navigation.isActive = true;
                    });
            }
        });
    }

    public $Navigation = (navigation: Navigation): Navigation => navigation;
}
