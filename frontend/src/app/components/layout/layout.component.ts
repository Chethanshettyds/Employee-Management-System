import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar" [class.collapsed]="sidebarCollapsed">
        <div class="sidebar-header">
          <h2 *ngIf="!sidebarCollapsed">EMS</h2>
          <button class="toggle-btn" (click)="toggleSidebar()">
            {{ sidebarCollapsed ? '☰' : '✕' }}
          </button>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <span class="icon">📊</span>
            <span class="text" *ngIf="!sidebarCollapsed">Dashboard</span>
          </a>

          <a routerLink="/employees" routerLinkActive="active" class="nav-item">
            <span class="icon">👥</span>
            <span class="text" *ngIf="!sidebarCollapsed">Employees</span>
          </a>

          <div class="nav-section" *ngIf="!sidebarCollapsed">
            <div class="section-title">Master Data</div>
          </div>

          <a routerLink="/masters/companies" routerLinkActive="active" class="nav-item">
            <span class="icon">🏢</span>
            <span class="text" *ngIf="!sidebarCollapsed">Companies</span>
          </a>

          <a routerLink="/masters/departments" routerLinkActive="active" class="nav-item">
            <span class="icon">🏛️</span>
            <span class="text" *ngIf="!sidebarCollapsed">Departments</span>
          </a>

          <a routerLink="/masters/designations" routerLinkActive="active" class="nav-item">
            <span class="icon">💼</span>
            <span class="text" *ngIf="!sidebarCollapsed">Designations</span>
          </a>

          <a routerLink="/masters/locations" routerLinkActive="active" class="nav-item">
            <span class="icon">📍</span>
            <span class="text" *ngIf="!sidebarCollapsed">Locations</span>
          </a>

          <a routerLink="/masters/employee-types" routerLinkActive="active" class="nav-item">
            <span class="icon">👔</span>
            <span class="text" *ngIf="!sidebarCollapsed">Employee Types</span>
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <h1>Employee Management System</h1>
          </div>

          <div class="topbar-right">
            <div class="user-info" *ngIf="currentUser">
              <span class="user-name">{{ currentUser.first_name }} {{ currentUser.last_name }}</span>
              <div class="user-dropdown">
                <button class="user-avatar">
                  {{ currentUser.first_name.charAt(0) }}{{ currentUser.last_name.charAt(0) }}
                </button>
                <div class="dropdown-menu">
                  <a href="#" (click)="logout($event)">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
      background: #f5f7fa;
    }

    /* Sidebar */
    .sidebar {
      width: 260px;
      background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
      color: white;
      transition: width 0.3s ease;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
      z-index: 1000;
    }

    .sidebar.collapsed {
      width: 70px;
    }

    .sidebar-header {
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 24px;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 5px 10px;
    }

    .sidebar-nav {
      padding: 20px 0;
    }

    .nav-section {
      padding: 15px 20px 10px;
    }

    .section-title {
      font-size: 12px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
      font-weight: 600;
      letter-spacing: 1px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      transition: all 0.3s;
      position: relative;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .nav-item.active {
      background: rgba(255,255,255,0.15);
      color: white;
      border-left: 4px solid #3498db;
    }

    .nav-item .icon {
      font-size: 20px;
      margin-right: 15px;
      min-width: 20px;
    }

    .sidebar.collapsed .nav-item {
      justify-content: center;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      margin-left: 260px;
      transition: margin-left 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .sidebar.collapsed ~ .main-content {
      margin-left: 70px;
    }

    /* Topbar */
    .topbar {
      background: white;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .topbar-left h1 {
      margin: 0;
      font-size: 20px;
      color: #2c3e50;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .user-dropdown {
      position: relative;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
    }

    .dropdown-menu {
      position: absolute;
      top: 50px;
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 150px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .user-dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      top: 45px;
    }

    .dropdown-menu a {
      display: block;
      padding: 12px 20px;
      color: #2c3e50;
      text-decoration: none;
      transition: background 0.3s;
    }

    .dropdown-menu a:hover {
      background: #f5f7fa;
    }

    /* Page Content */
    .page-content {
      padding: 30px;
      flex: 1;
    }

    /* Scrollbar */
    .sidebar::-webkit-scrollbar {
      width: 6px;
    }

    .sidebar::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.1);
    }

    .sidebar::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.3);
      border-radius: 3px;
    }
  `]
})
export class LayoutComponent implements OnInit {
  sidebarCollapsed = false;
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
