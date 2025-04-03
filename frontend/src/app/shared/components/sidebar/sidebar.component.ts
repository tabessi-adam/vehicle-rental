import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports:[CommonModule],
  standalone: true
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  userRole: string | null = null;
  mainMenuItems: any[] = [];
  
  bottomMenuItems = [
    { icon: 'fa-cog', label: 'Settings', route: '/settings' },
    { icon: 'fa-sign-out-alt', label: 'Logout', route: null }
  ];

  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to role changes
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    const role = this.userRole?.toUpperCase();
    
    switch (role) {
      case 'ADMIN':
        this.mainMenuItems = [
          { icon: 'fa-tachometer-alt', label: 'Dashboard', route: '/admin/dashboard' },
          { icon: 'fa-car', label: 'Vehicles', route: '/admin/vehicles/vehicles-dashboard' },
          { icon: 'fa-calendar-alt', label: 'Reservations', route: '/admin/reservations/reservations-dashboard' },
          { icon: 'fa-building', label: 'Agencies', route: '/admin/agencies' },
          { icon: 'fa-user-tie', label: 'Agents', route: '/admin/agents' },
          { icon: 'fa-users', label: 'Clients', route: '/admin/clients' },
          { icon: 'fa-star', label: 'Reviews', route: '/admin/reviews' }
        ];
        break;
      
      case 'AGENT':
        this.mainMenuItems = [
          { icon: 'fa-tachometer-alt', label: 'Dashboard', route: '/agent/dashboard' },
          { icon: 'fa-car', label: 'Vehicles', route: '/agent/vehicles/vehicles-dashboard' },
          { icon: 'fa-calendar-alt', label: 'Reservations', route: '/agent/reservations/reservations-dashboard' },
          { icon: 'fa-star', label: 'Reviews', route: '/agent/reviews' }
        ];
        break;
      
      case 'CLIENT':
        this.mainMenuItems = [
          { icon: 'fa-home', label: 'Home', route: '/home' },
          { icon: 'fa-car', label: 'Browse Cars', route: '/vehicles' },
          { icon: 'fa-calendar-alt', label: 'My Reservations', route: '/my-reservations' },
          { icon: 'fa-user', label: 'Profile', route: '/profile' }
        ];
        break;
      
      default:
        this.mainMenuItems = [];
        break;
    }
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  handleMenuClick(item: any): void {
    if (item.route === null && item.label === 'Logout') {
      this.authService.logout();
      this.router.navigate(['/']);
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}
