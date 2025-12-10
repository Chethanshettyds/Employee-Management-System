import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService, EmployeeType } from '../../../services/master.service';

@Component({
  selector: 'app-employee-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="master-page">
      <div class="header">
        <h2>Employee Types</h2>
        <button class="btn-primary" (click)="openAddForm()">+ Add Type</button>
      </div>

      <div class="modal" *ngIf="showForm" (click)="closeModalBackdrop($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'Edit Type' : 'Add New Type' }}</h3>
            <button class="close-btn" (click)="closeForm()" type="button">✕</button>
          </div>

          <form (ngSubmit)="onSubmit()" #form="ngForm">
            <div class="form-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Type Name *</label>
                  <select [(ngModel)]="employeeType.name" name="name" required>
                    <option value="">Select Type</option>
                    <option value="PERMANENT">Permanent</option>
                    <option value="TEMPORARY">Temporary</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERN">Intern</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label>Description</label>
                  <textarea [(ngModel)]="employeeType.description" name="description" rows="3"></textarea>
                </div>
                <div class="form-group checkbox-group">
                  <input type="checkbox" [(ngModel)]="employeeType.is_active" name="is_active" id="is_active">
                  <label for="is_active">Active</label>
                </div>
              </div>
            </div>
            <div class="form-footer">
              <button type="button" class="btn-cancel" (click)="closeForm()">Cancel</button>
              <button type="submit" class="btn-submit" [disabled]="!form.valid || saving">
                {{ saving ? 'Saving...' : (isEditMode ? 'Update' : 'Add') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="table-card">
        <table class="data-table" *ngIf="employeeTypes && employeeTypes.length > 0">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of employeeTypes">
              <td>{{ item.name }}</td>
              <td>{{ item.description || '-' }}</td>
              <td>
                <span class="badge" [class.active]="item.is_active" [class.inactive]="!item.is_active">
                  {{ item.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn-icon" (click)="edit(item)">✏️</button>
                <button class="btn-icon" (click)="delete(item.id!)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div *ngIf="!employeeTypes || employeeTypes.length === 0" class="no-data">
          <p>No employee types found</p>
          <button class="btn-primary" (click)="openAddForm()">+ Add First Type</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .master-page { animation: fadeIn 0.5s; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .header h2 { font-size: 28px; color: #2c3e50; margin: 0; }
    .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; border-radius: 16px; width: 100%; max-width: 700px; max-height: 90vh; overflow: auto; }
    .modal-header { display: flex; justify-content: space-between; padding: 24px; border-bottom: 2px solid #ecf0f1; }
    .modal-header h3 { margin: 0; color: #2c3e50; }
    .close-btn { background: #f0f0f0; border: none; font-size: 24px; cursor: pointer; width: 36px; height: 36px; border-radius: 50%; }
    .form-body { padding: 30px; }
    .form-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group.full-width { grid-column: 1 / -1; }
    .form-group.checkbox-group { flex-direction: row; align-items: center; gap: 10px; }
    .form-group label { margin-bottom: 8px; font-weight: 600; }
    .form-group input, .form-group textarea, .form-group select { padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; }
    .form-footer { display: flex; gap: 15px; justify-content: flex-end; padding: 20px 30px; border-top: 2px solid #ecf0f1; }
    .btn-cancel { background: white; border: 2px solid #ddd; padding: 12px 30px; border-radius: 8px; cursor: pointer; }
    .btn-submit { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; }
    .table-card { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 16px; text-align: left; border-bottom: 1px solid #ecf0f1; }
    .data-table th { background: #f8f9fa; font-weight: 700; }
    .badge { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; }
    .badge.active { background: #d4edda; color: #155724; }
    .badge.inactive { background: #f8d7da; color: #721c24; }
    .btn-icon { background: none; border: none; font-size: 20px; cursor: pointer; padding: 6px; }
    .no-data { text-align: center; padding: 60px; }
  `]
})
export class EmployeeTypesComponent implements OnInit {
  employeeTypes: EmployeeType[] = [];
  employeeType: EmployeeType = { name: '', description: '', is_active: true };
  showForm = false;
  isEditMode = false;
  saving = false;

  constructor(private service: MasterService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getEmployeeTypes().subscribe({
      next: (data) => this.employeeTypes = Array.isArray(data) ? data : (data as any).results || [],
      error: (e) => console.error(e)
    });
  }

  openAddForm(): void {
    this.employeeType = { name: '', description: '', is_active: true };
    this.isEditMode = false;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  closeModalBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal')) this.closeForm();
  }

  edit(item: EmployeeType): void {
    this.employeeType = { ...item };
    this.isEditMode = true;
    this.showForm = true;
  }

  onSubmit(): void {
    this.saving = true;
    const op = this.isEditMode
      ? this.service.updateEmployeeType(this.employeeType.id!, this.employeeType)
      : this.service.createEmployeeType(this.employeeType);
    op.subscribe({
      next: () => {
        this.saving = false;
        this.closeForm();
        this.load();
        alert('Saved!');
      },
      error: () => {
        this.saving = false;
        alert('Failed');
      }
    });
  }

  delete(id: number): void {
    if (confirm('Delete?')) {
      this.service.deleteEmployeeType(id).subscribe({
        next: () => {
          this.load();
          alert('Deleted!');
        },
        error: () => alert('Failed')
      });
    }
  }
}
