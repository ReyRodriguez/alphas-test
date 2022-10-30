import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../services/guards/login.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadChildren: () =>
                    import('../pages/home/home.module').then(
                        m => m.HomeModule,
                    ),
            },
            {
                path: 'login',
                loadChildren: () =>
                    import('../pages/login/login.module').then(
                        m => m.LoginModule,
                    ),
            },
            {
                path: 'directory',
                canActivate: [LoginGuard],
                loadChildren: () =>
                    import('../pages/directory/directory.module').then(
                        m => m.DirectoryModule,
                    ),
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
