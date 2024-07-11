import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { SupplierService } from "../../../supplier.service";
import { MatTableModule } from "@angular/material/table";
import { Entity } from "../../../models/Entity";
import { map, Observable, tap } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'dialog-screening-table',
    templateUrl: 'dialog-screening-table.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatTableModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        MatListModule,
        CommonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogScreeningTable implements OnInit {
    entities: any | null = null;//Entity[] = [];
    entityToShow: any = null;
    errorMessage: string | null = null;
    displayedColumns: string[] = ['DataFrom', 'Entity', 'Jurisdiction', 'LinkedTo'];
    loading: boolean = true;

    readonly supplier = inject<any>(MAT_DIALOG_DATA);
    public dialogRef = inject(MatDialogRef<DialogScreeningTable>);

    private cdr = inject(ChangeDetectorRef);

    constructor(
        private supplierService: SupplierService,
    ) { }

    ngOnInit(): void {
        const token = localStorage.getItem('token');
        if (token) {
            this.supplierService.screeningSupplier(this.supplier.businessName, token).pipe(
                tap(
                    response => {
                        this.loading = false;

                        if (response.error) {
                            this.errorMessage = response.error;
                        } else {
                            this.entities = response.rows;
                        }
                        this.cdr.markForCheck(); // Ensure change detection is run
                    }
                ),
                map(response => {
                    return response;
                }),
            ).subscribe();
        }
    }

    onCloseClick(): void {
        this.dialogRef.close()
    }
}