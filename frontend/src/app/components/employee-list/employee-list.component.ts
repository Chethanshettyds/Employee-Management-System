import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="employee-list">
      <div class="header">
        <h2>Employees</h2>
        <button class="btn-primary" routerLink="/employees/add">
          + Add Employee
        </button>
      </div>

      <div class="search-filter">
        <input 
          type="text" 
          placeholder="Search employees..." 
          [(ngModel)]="searchTerm"
          (input)="filterEmployees()"
          class="search-input"
        >
      </div>

      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let employee of filteredEmployees">
                <td>{{ employee.employee_id }}</td>
                <td>{{ employee.first_name }} {{ employee.last_name }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.phone }}</td>
                <td>Dept {{ employee.department }}</td>
                <td>Desg {{ employee.designation }}</td>
                <td>
                  <span class="badge" [class.active]="employee.is_active" [class.inactive]="!employee.is_active">
                    {{ employee.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-icon btn-edit" [routerLink]="['/employees/edit', employee.id]" title="Edit">
                      ✏️
                    </button>
                    <button class="btn-icon btn-delete" (click)="deleteEmployee(employee.id!)" title="Delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="filteredEmployees.length === 0" class="no-data">
          No employees found
        </div>
      </div>
    </div>
  `,
  styles: [`
    .employee-list {
      animation: fadeIn 0.5s;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .header h2 {
      font-size: 28px;
      color: #2c3e50;
      margin: 0;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
    }

    .search-filter {
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      max-width: 400px;
      padding: 12px 20px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
    }

    .search-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .table-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .table-responsive {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    .data-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
      font-size: 14px;
    }

    .data-table td {
      color: #555;
      font-size: 14px;
    }

    .data-table tbody tr:hover {
      background: #f8f9fa;
    }

    .badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .badge.active {
      background: #d4edda;
      color: #155724;
    }

    .badge.inactive {
      background: #f8d7da;
      color: #721c24;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .btn-icon {
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background 0.3s;
    }

    .btn-icon:hover {
      background: #f0f0f0;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #95a5a6;
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  filterEmployees(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.first_name.toLowerCase().includes(term) ||
      emp.last_name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.employee_id.toLowerCase().includes(term)
    );
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
          alert('Employee deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee');
        }
      });
    }
  }
}
