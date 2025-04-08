import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const permissionGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const permissionsNeededForRoute = route.data['permissions'] as string[];

    if (!authService.role) {
        return false;
    }

    return permissionsNeededForRoute.includes(authService.role)
        ? true
        : createUrlTreeFromSnapshot(route, ['/no-permission'])
};
