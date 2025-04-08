import { Routes } from '@angular/router';

import { noAuthGuard } from './guards/no-auth.guard';

export const authRoutes: Routes = [
    {
        path: 'login',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent),
    },
];
