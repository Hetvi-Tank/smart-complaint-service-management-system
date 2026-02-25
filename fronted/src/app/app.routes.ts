import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { UserDashboardComponent } from './modules/user/user-dashboard/user-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';


export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'user/dashboard',
    component: UserDashboardComponent
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auth/register/register.component')
        .then(m => m.RegisterComponent)
  },

  {
  path: 'admin',
  loadChildren: () =>
    import('./modules/admin/admin.module')
      .then(m => m.AdminModule),
  canActivate: [authGuard, roleGuard],
  data: { role: 'admin' }
},

  {
    path: 'agent',
    loadChildren: () =>
      import('./modules/agent/agent.module')
        .then(m => m.AgentModule),
        data: { role: 'agent' }
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module')
        .then(m => m.UserModule),
         data: { role: 'user' }
  }

];
