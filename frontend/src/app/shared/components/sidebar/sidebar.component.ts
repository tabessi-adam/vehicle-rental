import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports:[RouterLink,CommonModule]
})
export class SidebarComponent {
  isCollapsed = false;
  
  mainMenuItems = [
    { icon: 'fa-home', label: 'Dashboard', route: '/dashboard' },
    { icon: 'fa-chart-line', label: 'Analytics', route: '/analytics' },
    { icon: 'fa-users', label: 'Users', route: '/users' },
    { icon: 'fa-cog', label: 'Settings', route: '/settings' }
  ];

  bottomMenuItems = [
    { icon: 'fa-question-circle', label: 'Help', route: '/help' },
    { icon: 'fa-sign-out-alt', label: 'Logout', route: '/logout' }
  ];

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
