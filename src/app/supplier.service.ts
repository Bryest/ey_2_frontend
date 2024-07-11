import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserLogin } from './models/UserLogin';
import { Supplier } from './models/Supplier';
import { Guid } from 'guid-typescript';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = `https://localhost:7062/api`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post(`${this.apiUrl}/Auth/login`, body, { headers, responseType: 'text' });
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

  updateSupplier(id: Guid, supplier: Supplier, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/Supplier/${id}`, supplier, { headers });
  }

  deleteSupplier(id: Guid, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/Supplier/${id}`, { headers });
  }

  screeningSupplier(id: string, token: string, sources: string[]): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/Supplier/${id}/screening`, { headers });
  }
}

