import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        const { key } = params;
        const keyAsArray = key.split('.');
        const lastItem = keyAsArray[keyAsArray.length - 1];
        const wordsOfLastItem = this.getWordsWithUpperCase(lastItem);
        const prefix = environment.production ? '' : 'MISS__';
        return prefix + wordsOfLastItem.join(' ') || key;
    }

    private getWordsWithUpperCase(str: string): string[] {
        return str.split(/(?=[A-Z])/).map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    }
}



