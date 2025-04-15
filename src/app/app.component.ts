import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ScreenLoaderComponent } from "./components/screen-loader/screen-loader.component";
import { AlertComponent } from "./core/alert/alert.component";

@Component({
    selector: 'ox-root',
    imports: [RouterOutlet, AlertComponent, TranslateModule, ScreenLoaderComponent],
    providers: [TranslateService],
    templateUrl: './app.component.html',
    animations: [
        trigger('enter', [
            transition(':enter', [
                style({ opacity: 0, scale: 0.9 }),
                animate('400ms ease-in', style({ opacity: 1, scale: 1 }))
            ])
        ])
    ]
})
export class AppComponent {
    private readonly translate = inject(TranslateService);

    title = 'Ox Angular Starter Kit';

    constructor() {
        this.translate.addLangs(['en', 'hu']);
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }
}
