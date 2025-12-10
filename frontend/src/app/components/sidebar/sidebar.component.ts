import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Employees', icon: '👥', route: '/employees' },
    { label: 'Companies', icon: '🏢', route: '/companies' },
    { label: 'Departments', icon: '🏛️', route: '/departments' },
    { label: 'Master Data', icon: '📁', route: '/masters' }
  ];

  constructor(public router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}