import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
  { label: 'Dashboard', route: '/dashboard', icon: 'pi-chart-line' },
  { label: 'Employees', route: '/employees', icon: 'pi-users' },
  { label: 'Companies', route: '/companies', icon: 'pi-building' },
  { label: 'Departments', route: '/departments', icon: 'pi-sitemap' },
  { label: 'Designations', route: '/designations', icon: 'pi-briefcase' },
  { label: 'Locations', route: '/locations', icon: 'pi-map-marker' },
  { label: 'Employee Types', route: '/employee-types', icon: 'pi-id-card' }
];

  constructor(public router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}