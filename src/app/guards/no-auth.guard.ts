import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot, } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

export const noAuthGuard = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);

    return authService.isLoggedIn$().pipe(
        take(1),
        map(isLoggedIn =>
            !isLoggedIn
                ? // If the user is not logged in, allow the route
                true
                : // Redirect to home page
                createUrlTreeFromSnapshot(route, ['/'])
        )
    );
};
