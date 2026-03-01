import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ================= AUTH =================
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

  // ================= ADMIN =================
  {
    path: 'admin',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component')
        .then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/admin/admin-dashboard/admin-dashboard.component')
            .then(m => m.AdminDashboardComponent)
      },
      {
        path: 'create-agent',
        loadComponent: () =>
          import('./modules/admin/create-agent/create-agent.component')
            .then(m => m.CreateAgentComponent)
      }
    ]
  },

  // ================= AGENT =================
  {
    path: 'agent',
    loadComponent: () =>
      import('./layouts/agent-layout/agent-layout.component')
        .then(m => m.AgentLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/agent/agent-dashboard/agent-dashboard.component')
            .then(m => m.AgentDashboardComponent)
      },
      {
        path: 'assigned',
        loadComponent: () =>
          import('./modules/agent/assigned-complaints/assigned-complaints.component')
            .then(m => m.AssignedComplaintsComponent)
      }
    ]
  },

  // ================= USER =================
  {
    path: 'user',
    loadComponent: () =>
      import('./layouts/user-layout/user-layout.component')
        .then(m => m.UserLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/user/user-dashboard/user-dashboard.component')
            .then(m => m.UserDashboardComponent)
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./modules/user/add-complaint/add-complaint.component')
            .then(m => m.AddComplaintComponent)
      }
    ]
  },

  { path: '**', redirectTo: 'login' }

];