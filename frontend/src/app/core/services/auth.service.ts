import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private authStateSubject = new BehaviorSubject<boolean>(false);
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  authStateChanged$ = this.authStateSubject.asObservable();
  userRole$ = this.userRoleSubject.asObservable();
  isAuthenticated$ = this.authStateSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Initialize auth state and role
    this.authStateSubject.next(this.isLoggedIn());
    this.userRoleSubject.next(this.getUserRole());
  }

  login(email: string, password: string): Observable<any> {
    console.log('Attempting login with:', { email });
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  // Token management methods
  setToken(token: string, role: string): void {
    console.log('Setting token and role:', { role });
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
    }
    this.authStateSubject.next(true);
    this.userRoleSubject.next(role);
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  getUserRole(): string | null {
    const role = this.isBrowser ? localStorage.getItem('userRole') : null;
   
    return role;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
    }
    this.authStateSubject.next(false);
    this.userRoleSubject.next(null);
  }

  getDashboardRoute(): string {
    const role = this.getUserRole();
    console.log('Getting dashboard route for role:', role);
    switch (role?.toUpperCase()) {
      case 'ADMIN':
        return '/admin/dashboard';
      case 'AGENT':
        return '/agent/dashboard';
      case 'CLIENT':
        return '/home';
      default:
        console.log('No role found, defaulting to /login');
        return '/login';
    }
  }
}
