import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PageHeaderComponent } from "../../components/page-header/page-header.component";

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');

@Component({
    selector: 'ox-feature-admin',
    imports: [TranslatePipe, PageHeaderComponent],
    templateUrl: './feature-admin.component.html'
})
export class FeatureAdminComponent {
    private readonly httpClient = inject(HttpClient);
    private readonly translateService = inject(TranslateService);

    constructor() {
        this.loadAdditionalLanguage(`${this.translateService.currentLang}.admin`);
    }

    private loadAdditionalLanguage(language: string): void {
        const loader = httpLoaderFactory(this.httpClient);
        loader.getTranslation(language).subscribe((translations) => {
            this.translateService.setTranslation(language, translations, true); // Merge translations
            this.translateService.use(language);
        });
    }
}
