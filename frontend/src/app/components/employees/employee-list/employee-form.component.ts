import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService, Employee } from '../../../services/employee.service';
import { MasterService, Company, Department, Designation, Location, EmployeeType } from '../../../services/master.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="employee-form">
      <div class="form-header">
        <h2>{{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}</h2>
        <button class="btn-back" (click)="goBack()">← Back to List</button>
      </div>

      <form (ngSubmit)="onSubmit()" #employeeForm="ngForm" class="form-card">
        <div class="form-section">
          <h3>Basic Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Employee ID *</label>
              <input type="text" [(ngModel)]="employee.employee_id" name="employee_id" required>
            </div>

            <div class="form-group">
              <label>First Name *</label>
              <input type="text" [(ngModel)]="employee.first_name" name="first_name" required>
            </div>

            <div class="form-group">
              <label>Last Name *</label>
              <input type="text" [(ngModel)]="employee.last_name" name="last_name" required>
            </div>

            <div class="form-group">
              <label>Email *</label>
              <input type="email" [(ngModel)]="employee.email" name="email" required>
            </div>

            <div class="form-group">
              <label>Phone *</label>
              <input type="tel" [(ngModel)]="employee.phone" name="phone" required>
            </div>

            <div class="form-group">
              <label>Date of Birth *</label>
              <input type="date" [(ngModel)]="employee.date_of_birth" name="date_of_birth" required>
            </div>

            <div class="form-group">
              <label>Gender *</label>
              <select [(ngModel)]="employee.gender" name="gender" required>
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Address Information</h3>
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Address *</label>
              <textarea [(ngModel)]="employee.address" name="address" required rows="3"></textarea>
            </div>

            <div class="form-group">
              <label>City *</label>
              <input type="text" [(ngModel)]="employee.city" name="city" required>
            </div>

            <div class="form-group">
              <label>State *</label>
              <input type="text" [(ngModel)]="employee.state" name="state" required>
            </div>

            <div class="form-group">
              <label>Country *</label>
              <input type="text" [(ngModel)]="employee.country" name="country" required>
            </div>

            <div class="form-group">
              <label>Postal Code *</label>
              <input type="text" [(ngModel)]="employee.postal_code" name="postal_code" required>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Employment Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Company *</label>
              <select [(ngModel)]="employee.company" name="company" required>
                <option value="">Select Company</option>
                <option *ngFor="let company of companies" [value]="company.id">
                  {{ company.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Department *</label>
              <select [(ngModel)]="employee.department" name="department" required>
                <option value="">Select Department</option>
                <option *ngFor="let dept of departments" [value]="dept.id">
                  {{ dept.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Designation *</label>
              <select [(ngModel)]="employee.designation" name="designation" required>
                <option value="">Select Designation</option>
                <option *ngFor="let desig of designations" [value]="desig.id">
                  {{ desig.title }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Employee Type *</label>
              <select [(ngModel)]="employee.employee_type" name="employee_type" required>
                <option value="">Select Employee Type</option>
                <option *ngFor="let type of employeeTypes" [value]="type.id">
                  {{ type.type_name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Location *</label>
              <select [(ngModel)]="employee.location" name="location" required>
                <option value="">Select Location</option>
                <option *ngFor="let loc of locations" [value]="loc.id">
                  {{ loc.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Joining Date *</label>
              <input type="date" [(ngModel)]="employee.joining_date" name="joining_date" required>
            </div>

            <div class="form-group">
              <label>Salary *</label>
              <input type="number" [(ngModel)]="employee.salary" name="salary" required>
            </div>

            <div class="form-group">
              <label>Status</label>
              <div class="checkbox-group">
                <input type="checkbox" [(ngModel)]="employee.is_active" name="is_active" id="is_active">
                <label for="is_active">Active</label>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="goBack()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="!employeeForm.valid || loading">
            {{ loading ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Add Employee') }}
          </button>
        </div>

        <div class="error-message" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .employee-form {
      animation: fadeIn 0.5s;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .form-header h2 {
      font-size: 28px;
      color: #2c3e50;
      margin: 0;
    }

    .btn-back {
      background: #ecf0f1;
      color: #2c3e50;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s;
    }

    .btn-back:hover {
      background: #bdc3c7;
    }

    .form-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .form-section {
      margin-bottom: 30px;
    }

    .form-section h3 {
      font-size: 18px;
      color: #2c3e50;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #ecf0f1;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-group label {
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 500;
      font-size: 14px;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 0;
    }

    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .checkbox-group label {
      margin: 0;
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #ecf0f1;
    }

    .btn-primary,
    .btn-secondary {
      padding: 12px 30px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #ecf0f1;
      color: #2c3e50;
    }

    .btn-secondary:hover {
      background: #bdc3c7;
    }

    .error-message {
      background: #fee;
      color: #c33;
      padding: 12px;
      border-radius: 8px;
      margin-top: 20px;
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    department: 0,
    designation: 0,
    employee_type: 0,
    location: 0,
    company: 0,
    joining_date: '',
    salary: 0,
    is_active: true
  };

  companies: Company[] = [];
  departments: Department[] = [];
  designations: Designation[] = [];
  locations: Location[] = [];
  employeeTypes: EmployeeType[] = [];

  isEditMode = false;
  loading = false;
  errorMessage = '';

  constructor(
    private employeeService: EmployeeService,
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMasterData();
    
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadEmployee(id);
    }
  }

  loadMasterData(): void {
    this.masterService.getCompanies().subscribe(data => this.companies = data);
    this.masterService.getDepartments().subscribe(data => this.departments = data);
    this.masterService.getDesignations().subscribe(data => this.designations = data);
    this.masterService.getLocations().subscribe(data => this.locations = data);
    this.masterService.getEmployeeTypes().subscribe(data => this.employeeTypes = data);
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.errorMessage = 'Failed to load employee data';
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    const operation = this.isEditMode
      ? this.employeeService.updateEmployee(this.employee.id!, this.employee)
      : this.employeeService.createEmployee(this.employee);

    operation.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Employee updated successfully!' : 'Employee added successfully!');
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'An error occurred while saving employee';
        console.error('Error saving employee:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
