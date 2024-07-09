import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Supplier {
  id: string;
  businessName: string;
  tradeName: string;
  taxId: string;
  phoneNumber: string;
  email: string;
  website: string;
  psysicalAddress: string;
  country: string;
  annualBilling: number;
  lasEdited: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = `https://localhost:7062/api`;

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/Auth/login`, user);
  }

  getAllSupplier(token: string): Observable<Supplier[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Supplier[]>(`${this.apiUrl}/Supplier`, { headers });
  }

  getSupplierById(id: string, token: string): Observable<Supplier> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Supplier>(`${this.apiUrl}/Supplier/${id}`, { headers });
  }

  createSupplier(supplier: Supplier, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/Supplier`, supplier, { headers });
  }

  updateSupplier(id: string, supplier: Supplier, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/Supplier/${id}`, supplier, { headers });
  }

  deleteSupplier(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/Supplier/${id}`, { headers });
  }

  screeningSupplier(id: string, token: string, sources: string[]): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/Supplier/${id}/screening`, { headers });
  }
}

