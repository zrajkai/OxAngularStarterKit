import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { AlertComponent } from "./core/alert/alert.component";

@Component({
    selector: 'hg-root',
    imports: [RouterOutlet, AlertComponent, TranslateModule],
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'Angular front';

    constructor(private translate: TranslateService) {
        this.translate.addLangs(['en', 'hu']);
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }
}
