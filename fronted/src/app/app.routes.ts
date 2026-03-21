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
  {
 path:'change-password',
 loadComponent:()=>import('./modules/auth/change-password/change-password.component')
 .then(m=>m.ChangePasswordComponent)
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
      },
      {
        path: 'all-complaints',
        loadComponent: () =>
          import('./modules/admin/all-complaints/all-complaints.component')
            .then(m => m.AllComplaintsComponent)
      },
         {
        path: 'view-complaint/:id',
        loadComponent: () =>
          import('./modules/admin/view-complaints/view-complaints.component')
            .then(m => m.ViewComplaintsComponent)
        },
{
 path:'view-customers',
 loadComponent:()=>import('./modules/admin/view-customers/view-customers.component')
 .then(m=>m.ViewComplaintComponent)
},
{
      path: 'view-agents', 
      loadComponent: () =>
        import('./modules/admin/view-all-agents/view-all-agents.component')
          .then(m => m.ViewAllAgentsComponent)
    },
    {
 path:'view-users',
 loadComponent:()=>import('./modules/admin/view-users/view-users.component')
 .then(m=>m.ViewUsersComponent)
},
{
  path: 'view-report/:id',
  loadComponent: () =>
    import('./modules/admin/view-report/view-report.component')
      .then(m => m.ViewReportComponent)
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
    },
    {
    path: 'complaint-report/:id',
    loadComponent: () =>
      import('./modules/agent/complaint-report/complaint-report.component')
        .then(m => m.ComplaintReportComponent)
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
      },
        {
        path:'view-complaints',
        loadComponent:()=>import('./modules/user/view-complaints/view-complaints.component').then(m=>m.ViewComplaintsComponent)
        },
        {
  path: 'view-report/:id',
  loadComponent: () =>
    import('./modules/user/view-report/view-report.component')
      .then(m => m.ViewReportComponent)
}
    ]
  },

  { path: '**', redirectTo: 'login' }

];