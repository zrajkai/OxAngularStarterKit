import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
    {
        path: 'main',
        canActivate: [authGuard],
        loadChildren: () => import('./features/main/main.routes').then(c => c.mainRoutes),
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth.routes').then(c => c.authRoutes),
    },
    {
        path: 'not-found',
        loadComponent: () => import('./features/not-found/not-found.component').then(c => c.NotFoundComponent),
    },
    {
        path: 'no-license',
        loadComponent: () => import('./features/not-found/no-license.component').then(c => c.NoLicenseComponent),
    },
    {
        path: 'no-permission',
        loadComponent: () => import('./features/not-found/no-permission.component').then(c => c.NoPermissionComponent),
    },

    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: '**', redirectTo: 'not-found' },
];


export const authRoutes: Routes = [
    {
        path: 'login',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent),
    },
];
