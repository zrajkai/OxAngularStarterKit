import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';
import { TokenStorageService } from './token.storage.service';

interface AccessData {
    token_type: 'Bearer';
    expires_in: number;
    access_token: string;
    refresh_token: string;
}

interface AuthData extends AccessData {
    email: string;
    password: string;
    name: string;
    username: string;
    userId: string;
    role: string;
}

interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly configService = inject(ConfigService);
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly sessionStorageService = inject(LocalStorageService);
    private readonly tokenStorageService = inject(TokenStorageService);

    private readonly hostUrl = this.configService.getAPIUrl();

    private readonly USER_DATA_KEY = 'USER_Data';
    private readonly SESSION_EXPIRY_KEY = 'sessionExpiryData';
    private readonly SESSION_DURATION = 5 * 24 * 60 * 60 * 1000;

    // private isAuthenticated = false;
    private redirectUrl: string | null = null;
    private authToken: string | null = null;

    authUser = signal<User | undefined>(undefined);

    get user(): User | undefined {
        const userData = this.sessionStorageService.getItem(this.USER_DATA_KEY);
        if (userData) {
            try {
                return JSON.parse(userData as string) as User;
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }

        return undefined;
    }

    get role(): string | undefined {
        const userData = this.sessionStorageService.getItem(this.USER_DATA_KEY);
        if (userData) {
            try {
                return JSON.parse(userData as string).role;
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
        return undefined;
    }

    /**
     * Performs a request with user credentials
     * in order to get auth tokens
     *
     * @param {string} username
     * @param {string} password
     * @returns Observable<AuthData>
     */
    loginUser(username: string, password: string): Observable<AuthData> {
        return this.http.post<AuthData>(`${this.hostUrl}/auth/login`, { username, password, grant_type: 'password', })
            .pipe(
                tap(user => {
                    if (user.access_token) {
                        this.setUserSession(user);
                    }
                })
            );
    }


    isLoggedIn(): boolean {
        this.checkSessionExpiry();
        this.authToken = this.tokenStorageService.getAccessToken();
        return !!this.authToken;
    }

    isLoggedIn$(): Observable<boolean> {
        this.checkSessionExpiry();
        this.authToken = this.tokenStorageService.getAccessToken();
        return of(!!this.authToken);
    }

    logout(): void {
        this.tokenStorageService.removeTokens();
        this.sessionStorageService.removeItem(this.USER_DATA_KEY);
        this.sessionStorageService.removeItem(this.SESSION_EXPIRY_KEY);
        this.tokenStorageService.removeTokens();
        // this.isAuthenticated = false;
        this.authToken = null;
        this.router.navigate(['/login']);
    }

    /**
     * Asks for a new access token given
     * the stored refresh token
     *
     * @returns {Observable<AccessData>}
     */
    refreshToken(): Observable<AccessData> {
        const refreshToken = this.tokenStorageService.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('Refresh token does not exist'));
        }

        return this.http.post<AccessData>(`${this.hostUrl}/auth/login`, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        });
    }

    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }

    getRedirectUrl(): string | null {
        const url = this.redirectUrl;
        this.redirectUrl = null;
        return url;
    }

    private setUserSession(user: AuthData): void {
        if (user.access_token) {
            const data: User = {
                name: user.name,
                username: user.username,
                role: user.role,
                email: user.email,
                id: user.userId,
            };
            this.authUser.set(data);
            this.authToken = user.access_token;
            this.tokenStorageService.saveAccessToken(user.access_token);
            this.sessionStorageService.setItem(this.USER_DATA_KEY, JSON.stringify(data));
            this.setSessionExpiry();
            // this.isAuthenticated = true;

            if (user.role === undefined) {
                const redirectUrl = this.getRedirectUrl();
                this.setRedirectUrl(redirectUrl || '/user');
            }
        } else {
            console.error('User token is undefined');
            // this.isAuthenticated = false;
        }
    }

    private setSessionExpiry(): void {
        const expiryTime = new Date().getTime() + this.SESSION_DURATION;
        this.sessionStorageService.setItem(this.SESSION_EXPIRY_KEY, expiryTime.toString());
    }

    private checkSessionExpiry(): void {
        const expiryTime = this.sessionStorageService.getItem(this.SESSION_EXPIRY_KEY);
        if (expiryTime) {
            const currentTime = new Date().getTime();
            if (currentTime >= +expiryTime) {
                this.logout();
            }
        }
    }
}
