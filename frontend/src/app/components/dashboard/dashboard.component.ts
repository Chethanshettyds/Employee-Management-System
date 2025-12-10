import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="dashboard">
      <h2 class="page-title">Dashboard Overview</h2>

      <!-- Statistics Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon" style="background: #3498db;">👥</div>
          <div class="stat-content">
            <h3>Total Employees</h3>
            <p class="stat-number">{{ stats.total || 0 }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #e91e63;">👨</div>
          <div class="stat-content">
            <h3>Male Employees</h3>
            <p class="stat-number">{{ stats.male || 0 }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #9c27b0;">👩</div>
          <div class="stat-content">
            <h3>Female Employees</h3>
            <p class="stat-number">{{ stats.female || 0 }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: #4caf50;">✓</div>
          <div class="stat-content">
            <h3>Active Employees</h3>
            <p class="stat-number">{{ stats.active || 0 }}</p>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-grid">
        <div class="chart-card">
          <h3>Gender Distribution</h3>
          <div class="chart-container">
            <canvas 
              baseChart
              [type]="'doughnut'"
              [data]="genderChartData"
              [options]="chartOptions">
            </canvas>
          </div>
        </div>

        <div class="chart-card">
          <h3>Employment Type Distribution</h3>
          <div class="chart-container">
            <canvas 
              baseChart
              [type]="'bar'"
              [data]="employmentTypeChartData"
              [options]="barChartOptions">
            </canvas>
          </div>
        </div>
      </div>

      <!-- Recent Employees -->
      <div class="recent-section">
        <h3>Recent Employees</h3>
        <div class="table-responsive" *ngIf="recentEmployees && recentEmployees.length > 0">
          <table class="data-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Joining Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let employee of recentEmployees">
                <td>{{ employee.employee_id || '-' }}</td>
                <td>{{ employee.first_name }} {{ employee.last_name }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.department?.name || employee.department || '-' }}</td>
                <td>{{ employee.date_of_joining | date:'shortDate' }}</td>
                <td>
                  <span class="badge" [class.active]="employee.is_active" [class.inactive]="!employee.is_active">
                    {{ employee.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div *ngIf="!recentEmployees || recentEmployees.length === 0" class="no-data">
          No employees found
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      animation: fadeIn 0.5s;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .page-title {
      font-size: 28px;
      color: #2c3e50;
      margin-bottom: 30px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }

    .stat-content h3 {
      margin: 0 0 8px 0;
      font-size: 14px;
      color: #7f8c8d;
      font-weight: 500;
    }

    .stat-number {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
      color: #2c3e50;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .chart-card {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .chart-card h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      color: #2c3e50;
    }

    .chart-container {
      position: relative;
      height: 300px;
    }

    .recent-section {
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .recent-section h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      color: #2c3e50;
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
      padding: 12px;
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

    .no-data {
      text-align: center;
      padding: 40px;
      color: #95a5a6;
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    total: 0,
    male: 0,
    female: 0,
    active: 0
  };

  recentEmployees: any[] = [];  // Initialize as empty array

  genderChartData: ChartConfiguration['data'] = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#3498db', '#e91e63'],
      hoverBackgroundColor: ['#2980b9', '#c2185b']
    }]
  };

  employmentTypeChartData: ChartConfiguration['data'] = {
    labels: ['Permanent', 'Contract', 'Temporary', 'Intern'],
    datasets: [{
      label: 'Employees',
      data: [0, 0, 0, 0],
      backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#9c27b0'],
      borderColor: ['#4caf50', '#ff9800', '#f44336', '#9c27b0'],
      borderWidth: 1
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    console.log('🚀 Dashboard Component Initialized');
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    console.log('📥 Loading dashboard data...');
    
    this.employeeService.getEmployees().subscribe({
      next: (data: any) => {
        console.log('📦 Raw employee data:', data);
        
        // Handle both direct array and paginated response
        let employees: any[] = [];
        if (Array.isArray(data)) {
          employees = data;
        } else if (data && typeof data === 'object' && data.results) {
          employees = data.results;
        } else {
          employees = [];
        }
        
        console.log('✅ Employees array:', employees.length, 'items');

        // Safely calculate statistics
        this.stats.total = employees.length;
        this.stats.male = employees.filter(e => e.gender === 'M' || e.gender === 'Male').length;
        this.stats.female = employees.filter(e => e.gender === 'F' || e.gender === 'Female').length;
        this.stats.active = employees.filter(e => e.is_active === true).length;

        console.log('📊 Stats:', this.stats);

        // Update gender chart
        this.genderChartData.datasets[0].data = [this.stats.male, this.stats.female];

        // Count employee types
        const typeCount: { [key: string]: number } = {};
        employees.forEach(e => {
          const typeId = e.employee_type;
          typeCount[typeId] = (typeCount[typeId] || 0) + 1;
        });

        // Update employment type chart
        // Assuming employee_type IDs: 1=Permanent, 2=Contract, 3=Temporary, 4=Intern
        this.employmentTypeChartData.datasets[0].data = [
          typeCount[1] || 0,
          typeCount[2] || 0,
          typeCount[3] || 0,
          typeCount[4] || 0
        ];

        console.log('📊 Employment types:', typeCount);

        // Get recent employees (last 5 by joining date)
        this.recentEmployees = [...employees]
          .filter(e => e.date_of_joining)
          .sort((a, b) => {
            const dateA = new Date(a.date_of_joining).getTime();
            const dateB = new Date(b.date_of_joining).getTime();
            return dateB - dateA;
          })
          .slice(0, 5);

        console.log('✅ Recent employees:', this.recentEmployees.length);
      },
      error: (error) => {
        console.error('❌ Error loading dashboard data:', error);
        this.stats = { total: 0, male: 0, female: 0, active: 0 };
        this.recentEmployees = [];
      }
    });
  }
}
