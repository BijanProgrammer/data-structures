import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-monaco',
    templateUrl: './monaco.component.html',
    styleUrls: ['./monaco.component.scss'],
})
export class MonacoComponent implements OnInit {
    @Input() public codeUrl: string = '';

    public editorOptions = {theme: 'vs', language: 'java', fontSize: 20, automaticLayout: true};
    public code: String = '';

    public async ngOnInit(): void {
        const res = await fetch(this.codeUrl);
        this.code = await res.text();
    }
}
