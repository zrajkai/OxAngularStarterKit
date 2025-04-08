import { Injectable, inject } from '@angular/core';

import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';


@Injectable({ providedIn: 'root' })
export class TokenStorageService {
    private readonly configService = inject(ConfigService);
    private readonly sessionStorageService = inject(LocalStorageService);

    private readonly accessTokenKey =
        this.configService.getAuthSettings().accessTokenKey || 'accessToken';
    private readonly refreshTokenKey =
        this.configService.getAuthSettings().refreshTokenKey || 'refreshToken';

    getAccessToken(): string {
        return this.sessionStorageService.getItem(this.accessTokenKey) as string;
    }

    saveAccessToken(token: string) {
        this.sessionStorageService.setItem(this.accessTokenKey, token);
    }

    getRefreshToken(): string {
        return this.sessionStorageService.getItem(this.refreshTokenKey) as string;
    }

    saveRefreshToken(token: string) {
        this.sessionStorageService.setItem(this.refreshTokenKey, token);
    }

    saveTokens(accessToken: string, refreshToken: string) {
        this.saveAccessToken(accessToken);
        this.saveRefreshToken(refreshToken);
    }

    removeTokens() {
        this.sessionStorageService.removeItem(this.accessTokenKey);
        this.sessionStorageService.removeItem(this.refreshTokenKey);
    }
}
