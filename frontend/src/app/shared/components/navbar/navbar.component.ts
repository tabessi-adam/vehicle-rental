import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isProfileDropdownOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar__profile') && !target.closest('.navbar__hamburger')) {
      this.closeMenus();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768 && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) this.isProfileDropdownOpen = false;
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    if (this.isProfileDropdownOpen) this.isMobileMenuOpen = false;
  }

  navigateToHome() {
    this.router.navigate(['/']);
    this.closeMenus();
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
    this.closeMenus();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMenus();
  }

  handleKeydown(event: KeyboardEvent, path: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.navigateTo(path);
    }
  }

  handleProfileKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleProfileDropdown();
    }
  }

  private closeMenus() {
    this.isMobileMenuOpen = false;
    this.isProfileDropdownOpen = false;
  }
}