import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Temporal } from '@js-temporal/polyfill';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';
import { ConfigService } from './config.service';
import { TokenStorageService } from './token.storage.service';
import { environment } from '../environments/environment';
import { AuthR, User } from '../app/core/models/auth.models';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly configService = inject(ConfigService);
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly tokenStorageService = inject(TokenStorageService);
    private readonly hostUrl = this.configService.getAPIUrl();
    private authToken: string | null = null;

    authUser = signal<User | undefined>(undefined);

    get user(): User | undefined {
        const userData = this.authUser();
        if (userData) {
            return userData as User;
        }

        return undefined;
    }

    get role(): string | undefined {
        const userData = this.user;
        if (userData) {
            return (userData as User).role;
        }
        return undefined;
    }

    loginUser(username: string, password: string): Observable<AuthR> {
        return this.http.post<AuthR>(`${this.hostUrl}/auth/login`, { username, password, expiresInMins: environment.settings.auth.expirationInMins })
            .pipe(
                tap(auth => {
                    if (auth.accessToken) {
                        this.setUserSession(auth);
                    }
                })
            );
    }

    isLoggedIn$(): Observable<boolean> {
        this.authToken = this.tokenStorageService.getAccessToken();
        if (!!this.authToken) {
            const authData: User = this.tokenStorageService.getAccessTokenClaims();
            this.checkSessionExpiry(authData);
            this.authUser.set({
                id: authData.id,
                name: authData.name,
                username: authData.username,
                email: authData.email,
                role: 'admin', // FIXME: get role from server,
                exp: authData.exp
            });
        }
        return of(!!this.authToken);
    }

    logout(): void {
        this.tokenStorageService.removeTokens();
        this.authUser.set(undefined);
        this.authToken = null;
        this.router.navigate(['/auth/login']);
    }

    private setUserSession(authData: AuthR): void {
        if (authData.accessToken) {
            const claims = this.tokenStorageService.getAccessTokenClaims(authData.accessToken);
            const data: User = {
                id: authData.id,
                name: authData.firstName + ' ' + authData.lastName,
                username: authData.username,
                email: authData.email,
                role: 'admin', // FIXME: get role from server,
                exp: claims.exp
            };
            this.authUser.set(data);
            this.tokenStorageService.saveAccessToken(authData.accessToken);
        } else {
            console.error('User token is undefined');
        }
    }

    private checkSessionExpiry(authData: User): void {
        const expiryTime = authData?.exp * 1000;
        if (expiryTime) {
            const currentTime = Temporal.Now.instant().epochMilliseconds;
            if (currentTime >= +expiryTime) {
                this.logout();
            }
        }
    }
}
