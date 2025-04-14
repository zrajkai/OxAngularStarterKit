import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withDebugTracing } from '@angular/router';
import { MissingTranslationHandler, TranslateLoader, provideTranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { httpInterceptor } from './interceptors/http.interceptor';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { AppMissingTranslationHandler } from './core/missing.translations';


const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');


export const appConfig: ApplicationConfig = {
    providers: [
        // provideZoneChangeDetection({ eventCoalescing: true }),
        provideExperimentalZonelessChangeDetection(),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([
                httpInterceptor,
                loggingInterceptor
            ])
        ),
        provideRouter(routes, withDebugTracing()),
        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient, AppMissingTranslationHandler],

            },
            defaultLanguage: 'en',
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: AppMissingTranslationHandler
            }
        })
    ]
};
