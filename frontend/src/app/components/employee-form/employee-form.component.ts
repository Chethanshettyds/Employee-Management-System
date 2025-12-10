import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { MasterService } from '../../services/master.service';
import { Company, Department, Designation, Location, EmployeeType } from '../../models/master.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;
  isLoading = false;
  errorMessage = '';

  companies: Company[] = [];
  departments: Department[] = [];
  designations: Designation[] = [];
  locations: Location[] = [];
  employeeTypes: EmployeeType[] = [];

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
      date_of_leaving: [''],
      salary: ['', Validators.required],
      emergency_contact_name: ['', Validators.required],
      emergency_contact_phone: ['', Validators.required],
      emergency_contact_relation: ['', Validators.required],
      is_active: [true]
    });
  }

  ngOnInit(): void {
    console.log('🚀 Employee Form Component Initialized');
    
    // Load master data first
    this.loadMasterData();
    
    // Check if editing mode
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
        console.log('✅ Companies loaded:', this.companies.length, 'items', this.companies);
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
        console.log('✅ Departments loaded:', this.departments.length, 'items', this.departments);
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
        console.log('✅ Designations loaded:', this.designations.length, 'items', this.designations);
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
        console.log('✅ Locations loaded:', this.locations.length, 'items', this.locations);
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
        console.log('✅ Employee Types loaded:', this.employeeTypes.length, 'items', this.employeeTypes);
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

  onSubmit(): void {
    console.log('💾 Form submitted');
    console.log('Form valid:', this.employeeForm.valid);
    console.log('Form value:', this.employeeForm.value);
    console.log('Form errors:', this.getFormValidationErrors());

    if (this.employeeForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const employeeData = this.employeeForm.value;
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
            console.error('Error details:', error.error);
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
            console.error('Error details:', error.error);
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

  // Helper method to mark all fields as touched (shows validation errors)
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Helper method to get all validation errors
  private getFormValidationErrors(): any {
    const errors: any = {};
    Object.keys(this.employeeForm.controls).forEach(key => {
      const control = this.employeeForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }
}
