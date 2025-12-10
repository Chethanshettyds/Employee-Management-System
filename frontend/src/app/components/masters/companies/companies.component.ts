import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService, Company } from '../../../services/master.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="master-page">
      <div class="header">
        <h2>Companies</h2>
        <button class="btn-primary" (click)="openAddForm()">
          + Add Company
        </button>
      </div>

      <!-- Form Modal -->
      <div class="modal" *ngIf="showForm" (click)="closeModalBackdrop($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'Edit Company' : 'Add New Company' }}</h3>
            <button class="close-btn" (click)="closeForm()" type="button">✕</button>
          </div>

          <form (ngSubmit)="onSubmit()" #companyForm="ngForm" class="company-form">
            <div class="form-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Company Name *</label>
                  <input type="text" [(ngModel)]="company.name" name="name" required placeholder="Enter company name">
                </div>

                <div class="form-group full-width">
                  <label>Address *</label>
                  <textarea [(ngModel)]="company.address" name="address" required rows="2" placeholder="Enter full address"></textarea>
                </div>

                <div class="form-group">
                  <label>City *</label>
                  <input type="text" [(ngModel)]="company.city" name="city" required placeholder="Enter city">
                </div>

                <div class="form-group">
                  <label>State *</label>
                  <input type="text" [(ngModel)]="company.state" name="state" required placeholder="Enter state">
                </div>

                <div class="form-group">
                  <label>Country *</label>
                  <input type="text" [(ngModel)]="company.country" name="country" required placeholder="Enter country">
                </div>

                <div class="form-group">
                  <label>Postal Code *</label>
                  <input type="text" [(ngModel)]="company.pincode" name="pincode" required placeholder="Enter pincode">
                </div>

                <div class="form-group">
                  <label>Phone *</label>
                  <input type="tel" [(ngModel)]="company.phone" name="phone" required placeholder="Enter phone number">
                </div>

                <div class="form-group">
                  <label>Email *</label>
                  <input type="email" [(ngModel)]="company.email" name="email" required placeholder="company@example.com">
                </div>

                <div class="form-group">
                  <label>Website</label>
                  <input type="url" [(ngModel)]="company.website" name="website" placeholder="https://www.example.com">
                </div>

                <div class="form-group checkbox-group">
                  <input type="checkbox" [(ngModel)]="company.is_active" name="is_active" id="is_active">
                  <label for="is_active">Active</label>
                </div>
              </div>
            </div>

            <div class="form-footer">
              <button type="button" class="btn-cancel" (click)="closeForm()">
                Cancel
              </button>
              <button type="submit" class="btn-submit" [disabled]="!companyForm.valid || saving">
                {{ saving ? 'Saving...' : (isEditMode ? 'Update Company' : 'Add Company') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Companies Table -->
      <div class="table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                
                <th>Name</th>
                <th>City</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let comp of companies">
                
                <td>{{ comp.name }}</td>
                <td>{{ comp.city }}</td>
                <td>{{ comp.phone }}</td>
                <td>{{ comp.email }}</td>
                <td>
                  <span class="badge" [class.active]="comp.is_active" [class.inactive]="!comp.is_active">
                    {{ comp.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-icon edit" (click)="editCompany(comp)" title="Edit">✏️</button>
                    <button class="btn-icon delete" (click)="deleteCompany(comp.id!)" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="companies.length === 0" class="no-data">
          <p>No companies found</p>
          <button class="btn-primary" (click)="openAddForm()">+ Add Your First Company</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .master-page {
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
      font-size: 14px;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
    }

    /* Modal Styles */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal-content {
      background: white;
      border-radius: 16px;
      width: 100%;
      max-width: 900px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    }

    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 30px;
      border-bottom: 2px solid #ecf0f1;
    }

    .modal-header h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 22px;
      font-weight: 700;
    }

    .close-btn {
      background: #f0f0f0;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }

    .close-btn:hover {
      background: #e0e0e0;
      color: #333;
    }

    /* Form Styles */
    .company-form {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }

    .form-body {
      padding: 30px;
      overflow-y: auto;
      flex: 1;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
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

    .checkbox-group input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .checkbox-group label {
      margin: 0 !important;
      cursor: pointer;
    }

    .form-group label {
      margin-bottom: 8px;
      color: #2c3e50;
      font-weight: 600;
      font-size: 14px;
    }

    .form-group input,
    .form-group textarea {
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.3s;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder {
      color: #999;
    }

    /* Form Footer with Buttons */
    .form-footer {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      padding: 20px 30px;
      border-top: 2px solid #ecf0f1;
      background: #f8f9fa;
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
      transform: none;
    }

    /* Table Styles */
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
      padding: 16px;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    .data-table th {
      background: #f8f9fa;
      font-weight: 700;
      color: #2c3e50;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .data-table td {
      font-size: 14px;
      color: #555;
    }

    .data-table tbody tr:hover {
      background: #f8f9fa;
    }

    .badge {
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
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
      gap: 10px;
    }

    .btn-icon {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 6px;
      transition: all 0.3s;
    }

    .btn-icon.edit:hover {
      background: #e3f2fd;
    }

    .btn-icon.delete:hover {
      background: #ffebee;
    }

    .no-data {
      text-align: center;
      padding: 60px 20px;
      color: #95a5a6;
    }

    .no-data p {
      font-size: 18px;
      margin-bottom: 20px;
    }
  `]
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  company: Company = this.getEmptyCompany();
  showForm = false;
  isEditMode = false;
  saving = false;

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
  this.masterService.getCompanies().subscribe({
    next: (data) => {
      console.log('Raw data from API:', data);
      console.log('Is array?', Array.isArray(data));
      
      // CRITICAL: Always ensure it's an array
      if (Array.isArray(data)) {
        this.companies = data;
      } else if (data && typeof data === 'object') {
        // If it's an object with a results property (paginated)
        this.companies = (data as any).results || [];
      } else {
        this.companies = [];
      }
      
      console.log('Companies after processing:', this.companies);
    },
    error: (error) => {
      console.error('Error loading companies:', error);
      this.companies = [];
    }
  });
}


  getEmptyCompany(): Company {
    return {
      name: '',
      
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      phone: '',
      email: '',
      website: '',
      is_active: true
    };
  }

  openAddForm(): void {
    this.resetForm();
    this.showForm = true;
  }

  resetForm(): void {
    this.company = this.getEmptyCompany();
    this.isEditMode = false;
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  closeModalBackdrop(event: MouseEvent): void {
    // Close when clicking the dark backdrop
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeForm();
    }
  }

  editCompany(comp: Company): void {
    this.company = { ...comp };
    this.isEditMode = true;
    this.showForm = true;
  }

  onSubmit(): void {
  this.saving = true;

  // Clean the data
  const companyData = { ...this.company };
  if (!companyData.website || companyData.website.trim() === '') {
    companyData.website = '';
  }

  console.log('Submitting company:', companyData);

  const operation = this.isEditMode
    ? this.masterService.updateCompany(companyData.id!, companyData)
    : this.masterService.createCompany(companyData);

  operation.subscribe({
    next: (response) => {
      console.log('Company saved successfully:', response);
      // IMPORTANT: Reload the full list, don't use the response directly
      this.saving = false;
      this.closeForm();
      this.loadCompanies(); // This ensures we get an array
      alert(this.isEditMode ? 'Company updated successfully!' : 'Company added successfully!');
    },
    error: (error) => {
      this.saving = false;
      console.error('Full error object:', error);
      
      let errorMsg = 'Failed to save company. ';
      
      if (error.error) {
        // Django validation errors
        if (typeof error.error === 'object') {
          const errors = Object.keys(error.error).map(key => {
            return `${key}: ${error.error[key]}`;
          }).join(', ');
          errorMsg += errors;
        } else {
          errorMsg += error.error;
        }
      }
      
      alert(errorMsg);
    }
  });
}

  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.masterService.deleteCompany(id).subscribe({
        next: () => {
          this.loadCompanies();
          alert('Company deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting company:', error);
          alert('Failed to delete company. Please try again.');
        }
      });
    }
  }
}
