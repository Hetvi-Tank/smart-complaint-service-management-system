import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';


export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/login/login.component')
        .then(m => m.LoginComponent)
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
