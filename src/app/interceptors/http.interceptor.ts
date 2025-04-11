import { HttpErrorResponse, HttpEvent, HttpRequest, HttpHandlerFn, } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { TokenStorageService } from '../../services/token.storage.service';

export function httpInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

    const loaderService = inject(LoaderService);
    loaderService.showPageLoader();

    const authService = inject(AuthService);
    const alertService = inject(AlertService);
    const router = inject(Router);
    const tokenStorageService = inject(TokenStorageService);

    const handle401 = () => {
        authService.logout();
        return EMPTY;
    };
    const handle403 = () => {
        router.navigate(['/no-permission']);
        return EMPTY;
    };
    const handle404 = () => {
        console.debug('The requested API was not found! ', req.url);
        return EMPTY;
    };
    const handle500 = (e: HttpErrorResponse) => {
        console.error('Server error occurred!', e);
        return EMPTY;
    };
    const accessToken = tokenStorageService.getAccessToken();

    if (accessToken) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }

    return next(req)
        .pipe(
            // delay(2000), // TODO: remove
            catchError((error: HttpErrorResponse) => {
                // try to avoid errors on logout
                // therefore we check the url path of '/auth/'
                const ignoreAPIs = ['/auth/'];
                if (ignoreAPIs.some(api => req.url.includes(api))) {
                    return throwError(() => error);
                }

                // Handle global error status
                switch (error.status) {
                    case 401:
                        return handle401();
                    case 403:
                        return handle403();
                    case 404:
                        return handle404();
                    case 500:
                        return handle500(error);
                    // Add more error status handling here (e.g. 403)
                    default:
                        // Rethrow the error as is
                        return throwError(() => error);
                }
            }),
            finalize(() => {
                loaderService.hidePageLoader();
            })
        );
}
