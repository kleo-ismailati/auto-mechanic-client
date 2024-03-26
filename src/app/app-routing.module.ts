import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./features/admin-dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'bookings',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./features/booking-management/booking.module').then(m => m.BookingModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./features/user-management/user.module').then(m => m.UserModule)
  },
  {
    path: 'clients',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./features/client-management/client.module').then(m => m.ClientModule)
  },
  {path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
