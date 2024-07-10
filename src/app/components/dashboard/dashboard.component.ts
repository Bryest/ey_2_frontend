import { ChangeDetectionStrategy, Component, inject, model, OnInit, signal } from '@angular/core';
import { SupplierService } from '../../supplier.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { Supplier } from '../../models/Supplier';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  readonly dialogRef = inject(MatDialog);


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

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogRef.open(DialogDelete, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogRef.open(DialogEdit, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogRef.open(DialogAdd, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  formatTimestamp(timestamp: string): string {
    return this.datePipe.transform(timestamp, 'MMM d, y, h:mm:ss a') || '';
  }
}


@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDelete {
  readonly dialogRef = inject(MatDialogRef<DialogDelete>);
}

@Component({
  selector: 'dialog-edit',
  templateUrl: 'dialog-edit.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEdit {
  readonly dialogRef = inject(MatDialogRef<DialogEdit>);
}

@Component({
  selector: 'dialog-add',
  templateUrl: 'dialog-add.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAdd {
  readonly dialogRef = inject(MatDialogRef<DialogAdd>);
}
