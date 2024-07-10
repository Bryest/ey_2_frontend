import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { Supplier } from "../../../models/Supplier";
import { SupplierValidator } from "../FormValidator/FormValidator";
import { CommonModule, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'dialog-edit',
    templateUrl: 'dialog-edit.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        CommonModule,
        NgIf,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEdit implements OnInit {
    supplierForm = inject(SupplierValidator).supplierForm;

    readonly data = inject<Supplier>(MAT_DIALOG_DATA)
    readonly dialogRef = inject(MatDialogRef<DialogEdit>);

    ngOnInit(): void {
        if (this.data) {
            this.supplierForm.patchValue({
                businessName: this.data.businessName,
                tradeName: this.data.tradeName,
                taxId: this.data.taxId,
                phoneNumber: this.data.phoneNumber,
                email: this.data.email,
                website: this.data.website,
                physicalAddress: this.data.physicalAddress,
                country: this.data.country,
                annualBilling: this.data.annualBilling
            });
        }
    }


    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.dialogRef.close(this.data.id);
    }
}