import { Component, inject, model, OnInit } from '@angular/core';
import { SupplierService } from '../../supplier.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { Supplier } from '../../models/Supplier';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAdd } from './dialog-add/dialog-add';
import { DialogDetail } from './dialog-detail/dialog-detail';
import { DialogDelete } from './dialog-delete/dialog-delete';
import { DialogScreening } from './dialog-screening/dialog-screening';
import { DialogEdit } from './dialog-edit/dialog-edit';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  readonly supplier = model('')

  readonly dialog = inject(MatDialog);

  suppliers: Supplier[] = [];
  token: string | null = '';
  displayedColumns: string[] = [
    'businessName',
    'tradeName',
    'taxId',
    'phoneNumber',
    'email',
    'website',
    'physicalAddress',
    'country',
    'annualBilling',
    'lastEdited',
    'actions'];

  constructor(private supplierService: SupplierService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.supplierService.getAllSupplier(this.token).subscribe(
        data => this.suppliers = data,
        error => console.error(error)
      );
    }
  }

  openDetailDialog(supplier: Supplier, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogDetail, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: supplier
    });
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogAdd, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addSupplier(result);
      }
    });
  }

  addSupplier(supplierData: Supplier): void {
    if (this.token) {
      this.supplierService.createSupplier(supplierData, this.token).subscribe(
        newSupplier => this.suppliers.push(newSupplier),
        error => console.error(error)
      );
    }
  }


  openEditDialog(supplier: Supplier, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogEdit, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: supplier
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editSupplier(result);
      }
    })
  }

  editSupplier(supplierData: Supplier): void {
    if (this.token) {
      const supplierGuid = Guid.parse(supplierData.id);
      this.supplierService.updateSupplier(supplierGuid, supplierData, this.token).subscribe(
        updatedSupplier => this.suppliers.push(updatedSupplier),
        error => console.error(error)
      );
    }
  }

  openDeleteDialog(supplier: Supplier, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogDelete, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: supplier
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSupplier(result);
      }
    })
  }

  deleteSupplier(id: string): void {
    if (this.token) {
      const supplierGuid = Guid.parse(id);
      this.supplierService.deleteSupplier(supplierGuid, this.token).subscribe(
        () => this.suppliers = this.suppliers.filter(supplier => supplier.id !== id),
        error => console.error(error)
      );
    }
  }

  openScreeningDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogScreening, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  formatTimestamp(timestamp: string): string {
    return this.datePipe.transform(timestamp, 'MMM d, y, h:mm:ss a') || '';
  }
}