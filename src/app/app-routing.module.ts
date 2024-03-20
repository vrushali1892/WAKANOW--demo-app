import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';
import { RegisterComponent } from './modules/components/register/register.component';
import { UsersComponent } from './modules/components/users/users.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('src/app/modules/components/dashboard/dashboard.module').then(m => m.DashboardModule),
    component: DashboardComponent
  },
  {
    path: 'users',
    loadChildren: () => import('src/app/modules/components/users/users.module').then(m => m.UsersModule),
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
