import { Routes } from '@angular/router';
import { permissionGuard } from '../../guards/permission.guard';
import { UserRole } from '../../shared/constants/user-role.const';

export const mainRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./main.component').then(c => c.MainComponent),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () => import('../dashboard/dashboard.component').then(c => c.DashboardComponent),
            },
            {
                path: 'feature-one',
                loadComponent: () => import('../feature-one/feature-one.component').then(c => c.FeatureOneComponent),
                data: {
                    permissions: [UserRole.Admin, UserRole.User],
                },
                canActivate: [permissionGuard]
            },
            {
                path: 'feature-admin',
                loadComponent: () => import('../feature-admin/feature-admin.component').then(c => c.FeatureAdminComponent),
                data: {
                    permissions: [UserRole.Admin, UserRole.User],
                },
                canActivate: [permissionGuard]
            }
        ]
    },
];

