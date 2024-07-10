import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { SupplierService } from '../../supplier.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Supplier } from '../../models/Supplier';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogAdd } from './dialog-add/dialog-add';
import { DialogDetail } from './dialog-detail/dialog-detail';
import { DialogDelete } from './dialog-delete/dialog-delete';
import { DialogScreening } from './dialog-screening/dialog-screening';
import { DialogEdit } from './dialog-edit/dialog-edit';

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
    this.dialog.open(DialogAdd, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openEditDialog(supplier: Supplier, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogEdit, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: supplier
    });
  }

  openDeleteDialog(supplier: Supplier, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogDelete, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: supplier
    });
  }

  deleteSupplier(id: string): void {
    if (this.token) {
      this.supplierService.deleteSupplier(id, this.token).subscribe(
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