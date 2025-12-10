import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { MasterService } from '../../../services/master.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="employee-form-container">
      <div class="header">
        <h2>{{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}</h2>
        <button class="btn-cancel" (click)="cancel()">✕ Cancel</button>
      </div>

      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()" class="employee-form">
        <!-- Personal Information Section -->
        <div class="form-section">
          <h3>Personal Information</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Employee ID *</label>
              <input type="text" formControlName="employee_id" placeholder="EMP001">
            </div>
            
            <div class="form-group">
              <label>First Name *</label>
              <input type="text" formControlName="first_name" placeholder="John">
            </div>
            
            <div class="form-group">
              <label>Last Name *</label>
              <input type="text" formControlName="last_name" placeholder="Doe">
            </div>
            
            <div class="form-group">
              <label>Email *</label>
              <input type="email" formControlName="email" placeholder="john.doe@example.com">
            </div>
            
            <div class="form-group">
              <label>Phone *</label>
              <input type="tel" formControlName="phone" placeholder="+91 9876543210">
            </div>
            
            <div class="form-group">
              <label>Date of Birth *</label>
              <input type="date" formControlName="date_of_birth">
            </div>
            
            <div class="form-group">
              <label>Gender *</label>
              <select formControlName="gender">
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            
            <div class="form-group full-width">
              <label>Address *</label>
              <textarea formControlName="address" rows="2" placeholder="Street address"></textarea>
            </div>
            
            <div class="form-group">
              <label>City *</label>
              <input type="text" formControlName="city" placeholder="Bengaluru">
            </div>
            
            <div class="form-group">
              <label>State *</label>
              <input type="text" formControlName="state" placeholder="Karnataka">
            </div>
            
            <div class="form-group">
              <label>Pincode *</label>
              <input type="text" formControlName="pincode" placeholder="560001">
            </div>
          </div>
        </div>

        <!-- Employment Information Section -->
<div class="form-section">
  <h3>Employment Information</h3>
  <div class="form-grid">
    <div class="form-group">
      <label>Company *</label>
      <select formControlName="company">
        <option [value]="null">Select Company</option>
        <option *ngFor="let comp of companies" [value]="comp.id">
          {{ comp.name }}
        </option>
      </select>
    </div>
    
    <div class="form-group">
      <label>Department *</label>
      <select formControlName="department">
        <option [value]="null">Select Department</option>
        <option *ngFor="let dept of departments" [value]="dept.id">
          {{ dept.name }}
        </option>
      </select>
    </div>
    
    <div class="form-group">
      <label>Designation *</label>
      <select formControlName="designation">
        <option [value]="null">Select Designation</option>
        <option *ngFor="let desig of designations" [value]="desig.id">
          {{ desig.title }}
        </option>
      </select>
    </div>
    
    <div class="form-group">
      <label>Location *</label>
      <select formControlName="location">
        <option [value]="null">Select Location</option>
        <option *ngFor="let loc of locations" [value]="loc.id">
          {{ loc.name }}
        </option>
      </select>
    </div>
    
    <div class="form-group">
      <label>Employee Type *</label>
      <select formControlName="employee_type" (change)="onEmployeeTypeChange()">
        <option [value]="null">Select Type</option>
        <option *ngFor="let type of employeeTypes" [value]="type.id">
          {{ type.name }}
        </option>
      </select>
    </div>
    
    <div class="form-group">
      <label>Date of Joining *</label>
      <input type="date" formControlName="date_of_joining">
    </div>
    
    <!-- Conditionally show Date of Leaving -->
    <div class="form-group" *ngIf="shouldShowDateOfLeaving()">
      <label>Date of Leaving {{ isDateOfLeavingRequired() ? '*' : '' }}</label>
      <input type="date" formControlName="date_of_leaving">
    </div>
    
    <div class="form-group">
      <label>Salary *</label>
      <input type="number" formControlName="salary" placeholder="50000">
    </div>
  </div>
</div>


        <!-- Emergency Contact Section -->
        <div class="form-section">
          <h3>Emergency Contact</h3>
          <div class="form-grid">
            <div class="form-group">
              <label>Contact Name *</label>
              <input type="text" formControlName="emergency_contact_name" placeholder="Jane Doe">
            </div>
            
            <div class="form-group">
              <label>Contact Phone *</label>
              <input type="tel" formControlName="emergency_contact_phone" placeholder="+91 9876543210">
            </div>
            
            <div class="form-group">
              <label>Relation *</label>
              <input type="text" formControlName="emergency_contact_relation" placeholder="Spouse">
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="form-section">
          <div class="form-group checkbox-group">
            <input type="checkbox" formControlName="is_active" id="is_active">
            <label for="is_active">Active Status</label>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn-submit" [disabled]="!employeeForm.valid || isLoading">
            {{ isLoading ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Add Employee') }}
          </button>
        </div>

        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .employee-form-container {
      animation: fadeIn 0.5s;
      max-width: 1200px;
      margin: 0 auto;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .header h2 {
      font-size: 28px;
      color: #2c3e50;
      margin: 0;
    }

    .employee-form {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .form-section {
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 2px solid #ecf0f1;
    }

    .form-section:last-of-type {
      border-bottom: none;
    }

    .form-section h3 {
      margin: 0 0 20px 0;
      font-size: 20px;
      color: #2c3e50;
      font-weight: 600;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group.full-width {
      grid-column: 1 / -1;
    }

    .form-group.checkbox-group {
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }

    .form-group label {
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 600;
      font-size: 14px;
    }

    .checkbox-group label {
      margin-bottom: 0;
      cursor: pointer;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-group input.ng-invalid.ng-touched,
    .form-group select.ng-invalid.ng-touched,
    .form-group textarea.ng-invalid.ng-touched {
      border-color: #e74c3c;
    }

    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
    }

    .btn-cancel {
      background: white;
      color: #666;
      border: 2px solid #ddd;
      padding: 12px 30px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
    }

    .btn-cancel:hover {
      background: #f5f5f5;
      border-color: #bbb;
    }

    .btn-submit {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s;
      min-width: 150px;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
      font-size: 14px;
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;
  isLoading = false;
  errorMessage = '';

  // Arrays for dropdowns
  companies: any[] = [];
  departments: any[] = [];
  designations: any[] = [];
  locations: any[] = [];
  employeeTypes: any[] = [];

  // ✅ ADD THIS: Track selected employee type
  selectedEmployeeTypeName: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private masterService: MasterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      employee_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['M', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      company: [null, Validators.required],
      department: [null, Validators.required],
      designation: [null, Validators.required],
      location: [null, Validators.required],
      employee_type: [null, Validators.required],
      date_of_joining: ['', Validators.required],
      date_of_leaving: [''],  // Optional by default
      salary: ['', Validators.required],
      emergency_contact_name: ['', Validators.required],
      emergency_contact_phone: ['', Validators.required],
      emergency_contact_relation: ['', Validators.required],
      is_active: [true]
    });
  }

  ngOnInit(): void {
    console.log('🚀 Employee Form Initialized');
    this.loadMasterData();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeId = +params['id'];
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadMasterData(): void {
    console.log('📥 Loading master data...');

    // Load Companies
    this.masterService.getCompanies().subscribe({
      next: (data: any) => {
        this.companies = Array.isArray(data) ? data : (data.results || []);
        console.log('✅ Companies loaded:', this.companies.length, 'items');
      },
      error: (error) => {
        console.error('❌ Error loading companies:', error);
        this.companies = [];
      }
    });

    // Load Departments
    this.masterService.getDepartments().subscribe({
      next: (data: any) => {
        this.departments = Array.isArray(data) ? data : (data.results || []);
        console.log('✅ Departments loaded:', this.departments.length, 'items');
      },
      error: (error) => {
        console.error('❌ Error loading departments:', error);
        this.departments = [];
      }
    });

    // Load Designations
    this.masterService.getDesignations().subscribe({
      next: (data: any) => {
        this.designations = Array.isArray(data) ? data : (data.results || []);
        console.log('✅ Designations loaded:', this.designations.length, 'items');
      },
      error: (error) => {
        console.error('❌ Error loading designations:', error);
        this.designations = [];
      }
    });

    // Load Locations
    this.masterService.getLocations().subscribe({
      next: (data: any) => {
        this.locations = Array.isArray(data) ? data : (data.results || []);
        console.log('✅ Locations loaded:', this.locations.length, 'items');
      },
      error: (error) => {
        console.error('❌ Error loading locations:', error);
        this.locations = [];
      }
    });

    // Load Employee Types
    this.masterService.getEmployeeTypes().subscribe({
      next: (data: any) => {
        this.employeeTypes = Array.isArray(data) ? data : (data.results || []);
        console.log('✅ Employee Types loaded:', this.employeeTypes);
        
        // ✅ If editing, update the selected type name
        const currentTypeId = this.employeeForm.get('employee_type')?.value;
        if (currentTypeId && this.employeeTypes.length > 0) {
          const selectedType = this.employeeTypes.find(type => type.id === parseInt(currentTypeId));
          if (selectedType) {
            this.selectedEmployeeTypeName = selectedType.name?.toUpperCase() || '';
            console.log('✅ Current employee type:', this.selectedEmployeeTypeName);
          }
        }
      },
      error: (error) => {
        console.error('❌ Error loading employee types:', error);
        this.employeeTypes = [];
      }
    });
  }

  loadEmployee(id: number): void {
    console.log('📥 Loading employee with ID:', id);
    this.isLoading = true;

    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        console.log('✅ Employee loaded:', employee);
        this.employeeForm.patchValue(employee);
        
        // ✅ Update selected employee type name after loading
        if (employee.employee_type && this.employeeTypes.length > 0) {
          const selectedType = this.employeeTypes.find(type => type.id === employee.employee_type);
          if (selectedType) {
            this.selectedEmployeeTypeName = selectedType.name?.toUpperCase() || '';
          }
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error loading employee:', error);
        this.errorMessage = 'Failed to load employee data';
        this.isLoading = false;
        alert('Error loading employee. Redirecting to employee list.');
        this.router.navigate(['/employees']);
      }
    });
  }

  // ✅ ADD THIS METHOD: Called when employee type changes
  onEmployeeTypeChange(): void {
    const selectedTypeId = this.employeeForm.get('employee_type')?.value;
    
    if (selectedTypeId) {
      const selectedType = this.employeeTypes.find(type => type.id === parseInt(selectedTypeId));
      this.selectedEmployeeTypeName = selectedType?.name?.toUpperCase() || '';
      
      console.log('👔 Employee type changed to:', this.selectedEmployeeTypeName);
      
      // Update validators based on employee type
      const dateOfLeavingControl = this.employeeForm.get('date_of_leaving');
      
      if (this.isDateOfLeavingRequired()) {
        // Make it required for CONTRACT and INTERN
        dateOfLeavingControl?.setValidators([Validators.required]);
        console.log('✅ Date of leaving is now REQUIRED');
      } else {
        // Make it optional and clear value for PERMANENT
        dateOfLeavingControl?.clearValidators();
        if (!this.shouldShowDateOfLeaving()) {
          dateOfLeavingControl?.setValue('');  // Clear the value if hidden
        }
        console.log('✅ Date of leaving is now OPTIONAL');
      }
      
      dateOfLeavingControl?.updateValueAndValidity();
    }
  }

  // ✅ ADD THIS METHOD: Check if Date of Leaving should be shown
  shouldShowDateOfLeaving(): boolean {
    const typeName = this.selectedEmployeeTypeName.toUpperCase();
    const shouldShow = typeName === 'CONTRACT' || typeName === 'INTERN' || typeName === 'TEMPORARY';
    console.log('🔍 Should show date of leaving?', shouldShow, 'Type:', typeName);
    return shouldShow;
  }

  // ✅ ADD THIS METHOD: Check if Date of Leaving is required (has asterisk)
  isDateOfLeavingRequired(): boolean {
    const typeName = this.selectedEmployeeTypeName.toUpperCase();
    return typeName === 'CONTRACT' || typeName === 'INTERN';
  }

  onSubmit(): void {
  console.log('💾 Form submitted');
  console.log('Form valid:', this.employeeForm.valid);
  console.log('Form value:', this.employeeForm.value);

  if (this.employeeForm.valid) {
    this.isLoading = true;
    this.errorMessage = '';

    // ✅ Get form data and clean it
    const employeeData = { ...this.employeeForm.value };
    
    // ✅ Convert empty date_of_leaving to null
    if (!employeeData.date_of_leaving || employeeData.date_of_leaving === '') {
      employeeData.date_of_leaving = null;
    }
    
    console.log('📤 Sending employee data:', employeeData);

    if (this.isEditMode && this.employeeId) {
      // Update existing employee
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe({
        next: (response) => {
          console.log('✅ Employee updated successfully:', response);
          this.isLoading = false;
          alert('Employee updated successfully!');
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('❌ Error updating employee:', error);
          this.errorMessage = 'Error updating employee: ' + (error.error?.message || JSON.stringify(error.error));
          this.isLoading = false;
          alert('Failed to update employee. Check console for details.');
        }
      });
    } else {
      // Create new employee
      this.employeeService.createEmployee(employeeData).subscribe({
        next: (response) => {
          console.log('✅ Employee created successfully:', response);
          this.isLoading = false;
          alert('Employee added successfully!');
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('❌ Error creating employee:', error);
          this.errorMessage = 'Error creating employee: ' + (error.error?.message || JSON.stringify(error.error));
          this.isLoading = false;
          alert('Failed to create employee. Check console for details.');
        }
      });
    }
  } else {
    console.warn('⚠️ Form is invalid');
    this.errorMessage = 'Please fill all required fields correctly.';
    this.markFormGroupTouched(this.employeeForm);
    alert('Please fill all required fields correctly.');
  }
}


  cancel(): void {
    console.log('🚫 Form cancelled');
    this.router.navigate(['/employees']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
