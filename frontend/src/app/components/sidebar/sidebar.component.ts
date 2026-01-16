import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { label: 'Dashboard Overview', icon: 'pi-chart-line', route: '/dashboard' },
    { label: 'Manage Users', icon: 'pi-users', route: '/users' },
    { label: 'Departments', icon: 'pi-building', route: '/departments' },
    { label: 'Locations', icon: 'pi-map-marker', route: '/locations' },
    { label: 'Employee Types', icon: 'pi-id-card', route: '/employee-types' },
    { label: 'Settings', icon: 'pi-cog', route: '/settings' }
  ];

  constructor(public router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
