import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Matches backend Company model (NO code field in backend!)
export interface Company {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;        // backend uses 'pincode' not 'postal_code'
  phone: string;
  email: string;
  website?: string;       // optional in backend (blank=True, null=True)
  is_active: boolean;
}

// Matches backend Department model
export interface Department {
  id?: number;
  name: string;
  code: string;
  description?: string;   // optional in backend (blank=True, null=True)
  is_active: boolean;
}

// Matches backend Designation model
export interface Designation {
  id?: number;
  title: string;
  code: string;
  description?: string;   // optional in backend (blank=True, null=True)
  level: number;          // backend uses IntegerField, not string
  is_active: boolean;
}

// Matches backend Location model (NO code field in backend!)
export interface Location {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;        // backend uses 'pincode' not 'postal_code'
  is_active: boolean;
}

// Matches backend EmployeeType model (NO code field in backend!)
export interface EmployeeType {
  id?: number;
  name: string;           // backend uses 'name' not 'type_name'
  description?: string;   // optional in backend (blank=True, null=True)
  is_active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private baseUrl = 'http://127.0.0.1:8000/api/masters';

  constructor(private http: HttpClient) {
    console.log('🔧 MasterService initialized');
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private handleError(error: any, operation: string) {
    console.error(`❌ ${operation} failed:`, error);
    return throwError(() => error);
  }

  // ==================== COMPANIES ====================
  
  getCompanies(): Observable<Company[]> {
    console.log('📥 Fetching companies...');
    return this.http.get<Company[]>(`${this.baseUrl}/companies/`, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Companies fetched:', data.length, 'items')),
        catchError(err => this.handleError(err, 'getCompanies'))
      );
  }

  createCompany(company: Company): Observable<Company> {
    console.log('📤 Creating company:', company);
    return this.http.post<Company>(`${this.baseUrl}/companies/`, company, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Company created:', data)),
        catchError(err => this.handleError(err, 'createCompany'))
      );
  }

  updateCompany(id: number, company: Company): Observable<Company> {
    console.log('📤 Updating company:', id, company);
    return this.http.put<Company>(`${this.baseUrl}/companies/${id}/`, company, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Company updated:', data)),
        catchError(err => this.handleError(err, 'updateCompany'))
      );
  }

  deleteCompany(id: number): Observable<void> {
    console.log('🗑️ Deleting company:', id);
    return this.http.delete<void>(`${this.baseUrl}/companies/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => console.log('✅ Company deleted')),
        catchError(err => this.handleError(err, 'deleteCompany'))
      );
  }

  // ==================== DEPARTMENTS ====================
  
  getDepartments(): Observable<Department[]> {
    console.log('📥 Fetching departments...');
    return this.http.get<Department[]>(`${this.baseUrl}/departments/`, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Departments fetched:', data.length, 'items')),
        catchError(err => this.handleError(err, 'getDepartments'))
      );
  }

  createDepartment(dept: Department): Observable<Department> {
    console.log('📤 Creating department:', dept);
    return this.http.post<Department>(`${this.baseUrl}/departments/`, dept, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Department created:', data)),
        catchError(err => this.handleError(err, 'createDepartment'))
      );
  }

  updateDepartment(id: number, dept: Department): Observable<Department> {
    console.log('📤 Updating department:', id, dept);
    return this.http.put<Department>(`${this.baseUrl}/departments/${id}/`, dept, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Department updated:', data)),
        catchError(err => this.handleError(err, 'updateDepartment'))
      );
  }

  deleteDepartment(id: number): Observable<void> {
    console.log('🗑️ Deleting department:', id);
    return this.http.delete<void>(`${this.baseUrl}/departments/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => console.log('✅ Department deleted')),
        catchError(err => this.handleError(err, 'deleteDepartment'))
      );
  }

  // ==================== DESIGNATIONS ====================
  
  getDesignations(): Observable<Designation[]> {
    console.log('📥 Fetching designations...');
    return this.http.get<Designation[]>(`${this.baseUrl}/designations/`, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Designations fetched:', data.length, 'items')),
        catchError(err => this.handleError(err, 'getDesignations'))
      );
  }

  createDesignation(designation: Designation): Observable<Designation> {
    console.log('📤 Creating designation:', designation);
    return this.http.post<Designation>(`${this.baseUrl}/designations/`, designation, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Designation created:', data)),
        catchError(err => this.handleError(err, 'createDesignation'))
      );
  }

  updateDesignation(id: number, designation: Designation): Observable<Designation> {
    console.log('📤 Updating designation:', id, designation);
    return this.http.put<Designation>(`${this.baseUrl}/designations/${id}/`, designation, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Designation updated:', data)),
        catchError(err => this.handleError(err, 'updateDesignation'))
      );
  }

  deleteDesignation(id: number): Observable<void> {
    console.log('🗑️ Deleting designation:', id);
    return this.http.delete<void>(`${this.baseUrl}/designations/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => console.log('✅ Designation deleted')),
        catchError(err => this.handleError(err, 'deleteDesignation'))
      );
  }

  // ==================== LOCATIONS ====================
  
  getLocations(): Observable<Location[]> {
    console.log('📥 Fetching locations...');
    return this.http.get<Location[]>(`${this.baseUrl}/locations/`, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Locations fetched:', data.length, 'items')),
        catchError(err => this.handleError(err, 'getLocations'))
      );
  }

  createLocation(location: Location): Observable<Location> {
    console.log('📤 Creating location:', location);
    return this.http.post<Location>(`${this.baseUrl}/locations/`, location, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Location created:', data)),
        catchError(err => this.handleError(err, 'createLocation'))
      );
  }

  updateLocation(id: number, location: Location): Observable<Location> {
    console.log('📤 Updating location:', id, location);
    return this.http.put<Location>(`${this.baseUrl}/locations/${id}/`, location, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Location updated:', data)),
        catchError(err => this.handleError(err, 'updateLocation'))
      );
  }

  deleteLocation(id: number): Observable<void> {
    console.log('🗑️ Deleting location:', id);
    return this.http.delete<void>(`${this.baseUrl}/locations/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => console.log('✅ Location deleted')),
        catchError(err => this.handleError(err, 'deleteLocation'))
      );
  }

  // ==================== EMPLOYEE TYPES ====================
  
  getEmployeeTypes(): Observable<EmployeeType[]> {
    console.log('📥 Fetching employee types...');
    return this.http.get<EmployeeType[]>(`${this.baseUrl}/employee-types/`, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Employee types fetched:', data.length, 'items')),
        catchError(err => this.handleError(err, 'getEmployeeTypes'))
      );
  }

  createEmployeeType(type: EmployeeType): Observable<EmployeeType> {
    console.log('📤 Creating employee type:', type);
    return this.http.post<EmployeeType>(`${this.baseUrl}/employee-types/`, type, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Employee type created:', data)),
        catchError(err => this.handleError(err, 'createEmployeeType'))
      );
  }

  updateEmployeeType(id: number, type: EmployeeType): Observable<EmployeeType> {
    console.log('📤 Updating employee type:', id, type);
    return this.http.put<EmployeeType>(`${this.baseUrl}/employee-types/${id}/`, type, { headers: this.getHeaders() })
      .pipe(
        tap(data => console.log('✅ Employee type updated:', data)),
        catchError(err => this.handleError(err, 'updateEmployeeType'))
      );
  }

  deleteEmployeeType(id: number): Observable<void> {
    console.log('🗑️ Deleting employee type:', id);
    return this.http.delete<void>(`${this.baseUrl}/employee-types/${id}/`, { headers: this.getHeaders() })
      .pipe(
        tap(() => console.log('✅ Employee type deleted')),
        catchError(err => this.handleError(err, 'deleteEmployeeType'))
      );
  }
}
