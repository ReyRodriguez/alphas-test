import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'app', pathMatch: 'full'},
    {
        path: 'app',
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    },
    { path: '**', redirectTo: 'app' },
];
