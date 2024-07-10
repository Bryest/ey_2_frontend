import { Component, OnInit } from '@angular/core';
import { Supplier, SupplierService } from '../../supplier.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  suppliers: Supplier[] = [];
  token: string | null = '';
  displayedColumns: string[] = ['businessName', 'tradeName', 'taxId', 'phoneNumber', 'actions'];

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.supplierService.getAllSupplier(this.token).subscribe(
        data => this.suppliers = data,
        error => console.error(error)
      );
    }
  }
}
