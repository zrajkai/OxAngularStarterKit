import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const permissionGuard = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const permissionsNeededForRoute = route.data['permissions'] as string[];

    if (!authService.role) {
        return false;
    }

    return permissionsNeededForRoute.includes(authService.role)
        ? true
        : createUrlTreeFromSnapshot(route, ['/no-permission'])
};
