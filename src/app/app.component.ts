import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AlertComponent } from "./core/alert/alert.component";

@Component({
    selector: 'hg-root',
    imports: [RouterOutlet, AlertComponent, TranslateModule],
    templateUrl: './app.component.html',
    animations: [
        trigger('enter', [
            transition(':enter', [
                style({ opacity: 0, scale: 0.7 }),
                animate('400ms ease-in', style({ opacity: 1, scale: 1 }))
            ])
        ])
    ]
})
export class AppComponent {
    private readonly translate = inject(TranslateService);

    title = 'Enterprise Angular Starter Kit';

    constructor() {
        this.translate.addLangs(['en', 'hu']);
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }
}
