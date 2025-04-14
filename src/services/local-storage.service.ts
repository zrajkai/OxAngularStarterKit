import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    static readonly APP_PREFIX = 'OX-';

    setItem(key: string, value: unknown) {
        try {
            localStorage.setItem(
                `${LocalStorageService.APP_PREFIX}${key}`,
                JSON.stringify(value)
            );
        } catch {
            localStorage.setItem(`${LocalStorageService.APP_PREFIX}${key}`, value as string);
        }
    }

    getItem(key: string): unknown {
        const value = localStorage.getItem(`${LocalStorageService.APP_PREFIX}${key}`);
        try {
            return JSON.parse(value as string);
        } catch {
            return value;
        }
    }

    removeItem(key: string) {
        localStorage.removeItem(`${LocalStorageService.APP_PREFIX}${key}`);
    }
}
