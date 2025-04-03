import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';   
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard/admin-dashboard.component';
import { AgentDashboardComponent } from './agent/dashboard/agent-dashboard/agent-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'auth', children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]},
  { 
    path: 'admin', 
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'vehicles/vehicles-dashboard', loadComponent: () => 
        import('./admin/vehicles/vehicles-dashboard/vehicles-dashboard.component').then(m => m.VehiclesDashboardComponent) 
      },
      { path: 'reservations/reservations-dashboard', loadComponent: () => 
        import('./admin/reservations/reservations-dashboard/reservations-dashboard.component').then(m => m.ReservationsDashboardComponent) 
      },
      { path: 'agencies', loadComponent: () => 
        import('./admin/agencies/agencies-dashboard/agencies-dashboard.component').then(m => m.AgenciesDashboardComponent) 
      },
      { path: 'agents', loadComponent: () => 
        import('./admin/agents/agents-dashboard/agents-dashboard.component').then(m => m.AgentsDashboardComponent) 
      },
      { path: 'clients', loadComponent: () => 
        import('./admin/clients/clients-dashboard/clients-dashboard.component').then(m => m.ClientsDashboardComponent)       },
      { path: 'reviews', loadComponent: () => 
        import('./admin/reviews/reviews-dashboard/reviews-dashboard.component').then(m => m.ReviewsDashboardComponent) 
      }
    ]
  },
  { 
    path: 'agent', 
    children: [
      { path: 'dashboard', component: AgentDashboardComponent },
      { path: 'vehicles/vehicles-dashboard', loadComponent: () => 
        import('./agent/vehicles/vehicles-dashboard/vehicles-dashboard.component').then(m => m.VehiclesDashboardComponent) 
      },
      { path: 'reservations/reservations-dashboard', loadComponent: () => 
        import('./agent/reservations/reservations-dashboard/reservations-dashboard.component').then(m => m.ReservationsDashboardComponent) 
      },
      { path: 'reviews', loadComponent: () => 
        import('./agent/reviews/reviews-dashboard/reviews-dashboard.component').then(m => m.ReviewsDashboardComponent) 
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
