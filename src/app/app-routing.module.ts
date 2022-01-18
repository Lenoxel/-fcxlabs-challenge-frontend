import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { 
    path: '', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuardService],
  },
  {
    path: 'users/form', loadChildren: () => import('./pages/user-form/user-form.module').then(m => m.UserFormModule), canActivate: [AuthGuardService],
  },
  {
    path: 'users/form/:id', loadChildren: () => import('./pages/user-form/user-form.module').then(m => m.UserFormModule), canActivate: [AuthGuardService],
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'password/forgot', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
