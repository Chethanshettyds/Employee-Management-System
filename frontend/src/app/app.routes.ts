import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';
import { CompaniesComponent } from './components/masters/companies/companies.component';
import { DepartmentsComponent } from './components/masters/departments/departments.component';
import { DesignationsComponent } from './components/masters/designations/designations.component';
import { LocationsComponent } from './components/masters/locations/locations.component';
import { EmployeeTypesComponent } from './components/masters/employee-types/employee-types.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/add', component: EmployeeFormComponent },
      { path: 'employees/edit/:id', component: EmployeeFormComponent },
      { path: 'masters/companies', component: CompaniesComponent },
      { path: 'masters/departments', component: DepartmentsComponent },
      { path: 'masters/designations', component: DesignationsComponent },
      { path: 'masters/locations', component: LocationsComponent },
      { path: 'masters/employee-types', component: EmployeeTypesComponent },
    ]
  }
];
