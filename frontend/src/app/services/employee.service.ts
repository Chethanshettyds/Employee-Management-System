import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;  // Changed from postal_code to match backend
  company: number;
  department: number;
  designation: number;
  location: number;
  employee_type: number;
  date_of_joining: string;  // Changed from joining_date to match backend
  date_of_leaving?: string;  // Added optional field
  salary: number;
  emergency_contact_name: string;  // Added required field
  emergency_contact_phone: string;  // Added required field
  emergency_contact_relation: string;  // Added required field
  is_active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://127.0.0.1:8000/api/employees/';  // ✅ Added trailing slash

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  createEmployee(employee: Employee): Observable<Employee> {
    console.log('📤 Creating employee:', employee);
    return this.http.post<Employee>(this.apiUrl, employee, { headers: this.getHeaders() });
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    console.log('📤 Updating employee:', id, employee);
    return this.http.put<Employee>(`${this.apiUrl}${id}/`, employee, { headers: this.getHeaders() });
  }

  deleteEmployee(id: number): Observable<void> {
    console.log('🗑️ Deleting employee:', id);
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}statistics/`, { headers: this.getHeaders() });
  }
}
