import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterService, Location } from '../../../services/master.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="master-page">
      <div class="header">
        <h2>Locations</h2>
        <button class="btn-primary" (click)="openAddForm()">+ Add Location</button>
      </div>

      <!-- Form Modal -->
      <div class="modal" *ngIf="showForm" (click)="closeModalBackdrop($event)">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'Edit Location' : 'Add New Location' }}</h3>
            <button class="close-btn" (click)="closeForm()" type="button">✕</button>
          </div>

          <form (ngSubmit)="onSubmit()" #form="ngForm">
            <div class="form-body">
              <div class="form-grid">
                <div class="form-group full-width">
                  <label>Location Name *</label>
                  <input type="text" [(ngModel)]="location.name" name="name" required placeholder="Enter location name">
                </div>
                
                <div class="form-group full-width">
                  <label>Address *</label>
                  <textarea [(ngModel)]="location.address" name="address" required rows="2" placeholder="Enter full address"></textarea>
                </div>
                
                <div class="form-group">
                  <label>City *</label>
                  <input type="text" [(ngModel)]="location.city" name="city" required placeholder="e.g., Bengaluru">
                </div>
                
                <div class="form-group">
                  <label>State *</label>
                  <input type="text" [(ngModel)]="location.state" name="state" required placeholder="e.g., Karnataka">
                </div>
                
                <div class="form-group">
                  <label>Country *</label>
                  <input type="text" [(ngModel)]="location.country" name="country" required placeholder="e.g., India">
                </div>
                
                <div class="form-group">
                  <label>Pincode *</label>
                  <input type="text" [(ngModel)]="location.pincode" name="pincode" required placeholder="e.g., 560001">
                </div>
                
                <div class="form-group checkbox-group full-width">
                  <input type="checkbox" [(ngModel)]="location.is_active" name="is_active" id="is_active">
                  <label for="is_active">Active</label>
                </div>
              </div>
            </div>
            
            <div class="form-footer">
              <button type="button" class="btn-cancel" (click)="closeForm()">Cancel</button>
              <button type="submit" class="btn-submit" [disabled]="!form.valid || saving">
                {{ saving ? 'Saving...' : (isEditMode ? 'Update' : 'Add Location') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Table -->
      <div class="table-card">
        <div class="table-responsive" *ngIf="locations && locations.length > 0">
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Pincode</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let loc of locations">
                <td>{{ loc.name }}</td>
                <td>{{ loc.city }}</td>
                <td>{{ loc.state }}</td>
                <td>{{ loc.country }}</td>
                <td>{{ loc.pincode }}</td>
                <td>
                  <span class="badge" [class.active]="loc.is_active" [class.inactive]="!loc.is_active">
                    {{ loc.is_active ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="btn-icon edit" (click)="edit(loc)" title="Edit">✏️</button>
                    <button class="btn-icon delete" (click)="delete(loc.id!)" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="!locations || locations.length === 0" class="no-data">
          <p>No locations found</p>
          <button class="btn-primary" (click)="openAddForm()">+ Add First Location</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .master-page { animation: fadeIn 0.5s; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
    .header h2 { font-size: 28px; color: #2c3e50; margin: 0; }
    .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); }
    .modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
    .modal-content { background: white; border-radius: 16px; width: 100%; max-width: 800px; max-height: 90vh; overflow: auto; animation: slideUp 0.3s; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
    @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 24px 30px; border-bottom: 2px solid #ecf0f1; }
    .modal-header h3 { margin: 0; color: #2c3e50; font-size: 22px; font-weight: 700; }
    .close-btn { background: #f0f0f0; border: none; font-size: 24px; cursor: pointer; color: #666; width: 36px; height: 36px; border-radius: 50%; transition: all 0.3s; }
    .close-btn:hover { background: #e0e0e0; }
    .form-body { padding: 30px; }
    .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .form-group { display: flex; flex-direction: column; }
    .form-group.full-width { grid-column: 1 / -1; }
    .form-group.checkbox-group { flex-direction: row; align-items: center; gap: 10px; }
    .checkbox-group input[type="checkbox"] { width: 20px; height: 20px; cursor: pointer; }
    .checkbox-group label { margin: 0 !important; cursor: pointer; }
    .form-group label { margin-bottom: 8px; color: #2c3e50; font-weight: 600; font-size: 14px; }
    .form-group input, .form-group textarea { padding: 12px 16px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 14px; font-family: inherit; transition: border-color 0.3s; }
    .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #667eea; }
    .form-footer { display: flex; gap: 15px; justify-content: flex-end; padding: 20px 30px; border-top: 2px solid #ecf0f1; background: #f8f9fa; }
    .btn-cancel { background: white; color: #666; border: 2px solid #ddd; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
    .btn-cancel:hover { background: #f5f5f5; }
    .btn-submit { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; min-width: 150px; }
    .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .table-card { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 16px; text-align: left; border-bottom: 1px solid #ecf0f1; }
    .data-table th { background: #f8f9fa; font-weight: 700; color: #2c3e50; font-size: 14px; text-transform: uppercase; }
    .data-table tbody tr:hover { background: #f8f9fa; }
    .badge { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: uppercase; }
    .badge.active { background: #d4edda; color: #155724; }
    .badge.inactive { background: #f8d7da; color: #721c24; }
    .action-buttons { display: flex; gap: 10px; }
    .btn-icon { background: none; border: none; font-size: 20px; cursor: pointer; padding: 6px 10px; border-radius: 6px; transition: all 0.3s; }
    .btn-icon.edit:hover { background: #e3f2fd; }
    .btn-icon.delete:hover { background: #ffebee; }
    .no-data { text-align: center; padding: 60px 20px; color: #95a5a6; }
  `]
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  location: Location = this.getEmptyLocation();
  showForm = false;
  isEditMode = false;
  saving = false;

  constructor(private service: MasterService) {}

  ngOnInit(): void {
    console.log('🚀 Locations Component Initialized');
    this.load();
  }

  load(): void {
    console.log('📥 Loading locations...');
    this.service.getLocations().subscribe({
      next: (data: any) => {
        this.locations = Array.isArray(data) ? data : (data.results || []);
        console.log('✅ Locations loaded:', this.locations.length, 'items');
      },
      error: (error) => {
        console.error('❌ Error loading locations:', error);
        this.locations = [];
      }
    });
  }

  getEmptyLocation(): Location {
    return {
      name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      is_active: true
    };
  }

  openAddForm(): void {
    this.location = this.getEmptyLocation();
    this.isEditMode = false;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  closeModalBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal')) {
      this.closeForm();
    }
  }

  edit(item: Location): void {
    this.location = { ...item };
    this.isEditMode = true;
    this.showForm = true;
  }

  onSubmit(): void {
    console.log('💾 Saving location:', this.location);
    this.saving = true;
    
    const op = this.isEditMode
      ? this.service.updateLocation(this.location.id!, this.location)
      : this.service.createLocation(this.location);
    
    op.subscribe({
      next: () => {
        this.saving = false;
        this.closeForm();
        this.load();
        alert(this.isEditMode ? 'Location updated!' : 'Location added!');
      },
      error: (error) => {
        this.saving = false;
        console.error('❌ Error:', error);
        alert('Failed to save location: ' + JSON.stringify(error.error));
      }
    });
  }

  delete(id: number): void {
    if (confirm('Delete this location?')) {
      this.service.deleteLocation(id).subscribe({
        next: () => {
          this.load();
          alert('Location deleted!');
        },
        error: (error) => {
          console.error('❌ Error:', error);
          alert('Failed to delete');
        }
      });
    }
  }
}
