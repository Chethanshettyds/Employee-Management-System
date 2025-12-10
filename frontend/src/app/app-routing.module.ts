import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { CompanyComponent } from './components/company/company.component';
import { DepartmentComponent } from './components/department/department.component';
import { MastersComponent } from './components/masters/masters.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/new', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'companies', component: CompanyComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentComponent, canActivate: [AuthGuard] },
  { path: 'masters', component: MastersComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }